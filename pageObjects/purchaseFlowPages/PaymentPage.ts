import { expect, Page } from "@playwright/test";
import { dataStore } from "../../utils/DataStore";

export class PaymentPage {
    constructor(private page: Page) {}

    private cvvInput = this.page.locator("//div[contains(text(), 'CVV Code')]/following-sibling::input");
    private emailField = this.page.locator("//div[contains(text(), 'Shipping Information')]/following::input[1]");
    private countryInput = this.page.locator("input[placeholder='Select Country']");
    private countryDropdownOption = (country: string) =>
        this.page.locator(`button.ta-item:has-text("${country}")`);
    private couponInput = this.page.locator("input[name='coupon']");
    private couponButton = this.page.locator("button[type='submit'].btn.btn-primary.mt-1")
    private couponConfirmationMessage= this.page.locator("p.mt-1.ng-star-inserted");
    private placeOrderButton = this.page.locator(".btnn.action__submit.ng-star-inserted");
    private emailDisplayLabel = this.page.locator("label[type='text']");



    async enterCvv(code: string): Promise<void> {
        await this.cvvInput.fill(code);
    }

    async verifyEmailPrefilled(): Promise<void> {
        const loggedInEmail = dataStore.getValue<string>("loggedInEmail");

        await this.emailField.waitFor({ state: "attached" });
        await expect(this.emailField).toBeVisible();

        const displayedPaymentPageEmail = await this.emailField.inputValue();

        expect(displayedPaymentPageEmail.trim()).toBe(loggedInEmail.trim());

        console.log(`✅ Email verified:
→ loggedInEmail: ${loggedInEmail}
→ displayedPaymentPageEmail: ${displayedPaymentPageEmail}`);
    }


    async verifyEmailLabel(): Promise<void> {
        const loggedInEmail = dataStore.getValue<string>("loggedInEmail");

        await this.emailDisplayLabel.waitFor({ state: "visible" });
        const displayedLabelEmail = (await this.emailDisplayLabel.textContent())?.trim();

        expect(displayedLabelEmail).toBe(loggedInEmail.trim());

        console.log(`✅ Email label verified:
→ loggedInEmail: ${loggedInEmail}
→ displayedLabelEmail: ${displayedLabelEmail}`);
    }


    async selectCountry(country: string): Promise<void> {
        await this.countryInput.click();
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Backspace');
        await this.page.keyboard.type(country, { delay: 150 });

        const option = this.countryDropdownOption(country);
        await expect(option).toBeVisible({ timeout: 8000 });
        await option.click();
    }

    async applyCoupon(code: string): Promise<void> {
        await this.couponInput.fill(code);
        await this.couponButton.click();
        console.log(`✅ Coupon code entered: ${code}`);
        await this.verifyCouponAppliedMessage();
    }

    async verifyCouponAppliedMessage(): Promise<void> {
        await expect(this.couponConfirmationMessage).toHaveText("* Coupon Applied");
        console.log("✅ Coupon applied confirmation message verified.");
    }

    async clickPlaceOrderButton(): Promise<void> {
        await this.placeOrderButton.click();
        console.log("✅ Place Order button clicked.");
    }


}
