
import { expect, Page } from "@playwright/test";
import { dataStore, ProductDetails } from "../../utils/DataStore";

export class OrderConfirmationPage {
    constructor(private page: Page) {}

    private orderConfirmationMessage = this.page.locator(".hero-primary");
    private orderIdOnConfirmationPage = this.page.locator("label[class='ng-star-inserted']");
    private orderHistoryPage = this.page.locator("label[routerlink='/dashboard/myorders']");
    private orderHistoryPageTitle = this.page.locator("h1[class='ng-star-inserted']");

    async verifyOrderConfirmationMessage(): Promise<void> {
        await expect(this.orderConfirmationMessage).toHaveText("Thankyou for the order.");
        console.log("✅ Order confirmation message verified.");
    }

    async verifyProductDetailsOnOrderConfirmationPage(): Promise<void> {
        const displayedOrderIdOnConfirmationPage = (await this.orderIdOnConfirmationPage.innerText())
            .replace(/\|/g, '')
            .trim();

        const storedProduct = dataStore.getValue<ProductDetails>("product");

        if (!storedProduct) {
            throw new Error("❌ No product found in data store.");
        }

        const updatedProduct: ProductDetails = {
            ...storedProduct,
            orderIdOnConfirmationPage: displayedOrderIdOnConfirmationPage,
        };

        dataStore.setValue<ProductDetails>("product", updatedProduct);
        console.log(`✅ Stored order ID from confirmation page: ${displayedOrderIdOnConfirmationPage}`);
    }

    async navigateToOrderHistoryPage(): Promise<void> {
        await this.orderHistoryPage.click();
        await expect(this.orderHistoryPageTitle).toHaveText("Your Orders");
    }
}
