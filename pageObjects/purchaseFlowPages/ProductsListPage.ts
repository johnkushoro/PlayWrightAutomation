
// pages/ProductsListPage.ts

import { Locator, Page } from "@playwright/test";
import { dataStore, ProductDetails } from "../../utils/DataStore";

export class ProductsListPage {
    constructor(private page: Page) {}

    private productCards = this.page.locator("div.card-body");
    private cartButton = () => this.page.locator(".btn.btn-custom[routerlink='/dashboard/cart']");

    private getProductElements(product: Locator) {
        return {
            name: product.locator("h5 b"),
            price: product.locator("div.d-flex.flex-row.my-2 div.text-muted"),
            addToCartButton: product.locator('button:has-text("Add To Cart")'),
        };
    }

    private async storeAndAddToCart(product: Locator): Promise<void> {
        const { name, price, addToCartButton } = this.getProductElements(product);

        const selectedProductNameOnPLP = (await name.innerText()).trim();
        const selectedProductPriceOnPLP = (await price.innerText()).trim();

        const details: ProductDetails = {
            name: selectedProductNameOnPLP,
            price: selectedProductPriceOnPLP,
        };

        dataStore.setValue<ProductDetails>("product", details);

        await addToCartButton.click();

        console.log(`🛒 Added to cart: ${selectedProductNameOnPLP} | 💾 Stored:`, details);
    }

    async getProductCardDetails(index = 0): Promise<ProductDetails> {
        const product = this.productCards.nth(index);
        const { name, price } = this.getProductElements(product);

        const nameText = await name.innerText();
        const priceText = await price.innerText();

        const details: ProductDetails = {
            name: nameText.trim(),
            price: priceText.trim(),
        };

        console.log(`✅ Product [${index}]:`, details);
        return details;
    }

    async addProductToCartByIndex(index = 0): Promise<void> {
        await this.storeAndAddToCart(this.productCards.nth(index));
    }

    async addFirstProductToCart(): Promise<void> {
        await this.storeAndAddToCart(this.productCards.first());
    }

    async addProductToCartByName(productNameToFind: string): Promise<void> {
        const count = await this.productCards.count();
        for (let i = 0; i < count; i++) {
            const product = this.productCards.nth(i);
            const { name } = this.getProductElements(product);
            const nameText = (await name.innerText()).trim();

            if (nameText === productNameToFind.trim()) {
                await this.storeAndAddToCart(product);
                return;
            }
        }
        throw new Error(`❌ Product "${productNameToFind}" not found`);
    }

    async clickCartButton(): Promise<void> {
        await this.cartButton().click();
        await this.page.locator("div li").first().waitFor();

    }
}
