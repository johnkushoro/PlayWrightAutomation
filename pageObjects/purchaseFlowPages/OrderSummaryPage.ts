
import { expect, Page } from "@playwright/test";
import { dataStore, ProductDetails } from "../../utils/DataStore";

export class OrderSummaryPage {
    constructor(private page: Page) {}

    private orderIdOnSummaryPage = this.page.locator(".col-text.-main");

    async verifyOrderItemsOnSummaryPage(): Promise<void> {
        const storedProduct = dataStore.getValue<ProductDetails>("product");

        if (!storedProduct?.orderIdOnConfirmationPage) {
            throw new Error("❌ Order ID from confirmation page not found in stored product.");
        }

        const orderIdFromSummaryPage = (await this.orderIdOnSummaryPage.innerText()).trim();

        console.log("\n---🔍 ORDER ID COMPARISON ---");
        console.log(`🟢 Confirmation Page ID: ${storedProduct.orderIdOnConfirmationPage}`);
        console.log(`🟣 Summary Page ID:      ${orderIdFromSummaryPage}`);
        console.log("------------------------------");

        // Save the order ID from the ]summary page for future use (optional)
        const updatedProduct: ProductDetails = {
            ...storedProduct,
            orderIdOnSummaryPage: orderIdFromSummaryPage,
        };
        dataStore.setValue<ProductDetails>("product", updatedProduct);

        expect(orderIdFromSummaryPage).toBe(storedProduct.orderIdOnConfirmationPage);
        console.log("✅ Order ID on summary page matches confirmation page.");
    }

}
