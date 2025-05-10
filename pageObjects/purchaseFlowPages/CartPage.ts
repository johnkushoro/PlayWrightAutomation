// pages/CartPage.ts

import { expect, Locator, Page } from "@playwright/test";
import { dataStore, ProductDetails } from "../../utils/DataStore";

export class CartPage {
    constructor(private page: Page) {}

    private productName = this.page.locator("div[class='cartSection'] h3");
    private productPrice = this.page.locator("div[class='prodTotal cartSection'] p");
    private checkOutButton = this.page.locator("li[class='totalRow'] button[type='button']");

    async verifyProductDetails(): Promise<void> {
        const storedProduct = dataStore.getValue<ProductDetails>("product");

        const displayedProductNameOnCartPage = (await this.productName.innerText()).trim();
        const displayedProductPriceOnCartPage = (await this.productPrice.innerText()).trim();

        const selectedProductNameOnPLP = storedProduct.name;
        const selectedProductPriceOnPLP = storedProduct.price;

        expect(displayedProductNameOnCartPage).toBe(selectedProductNameOnPLP);
        expect(displayedProductPriceOnCartPage).toBe(selectedProductPriceOnPLP);

        console.log(`✅ Cart Verification Passed:
→ selectedProductNameOnPLP: "${selectedProductNameOnPLP}"
→ displayedProductNameOnCartPage: "${displayedProductNameOnCartPage}"
→ selectedProductPriceOnPLP: "${selectedProductPriceOnPLP}"
→ displayedProductPriceOnCartPage: "${displayedProductPriceOnCartPage}"`);
    }

    async clickCheckOutButton(): Promise<void> {
        await this.checkOutButton.click();
    }
}
