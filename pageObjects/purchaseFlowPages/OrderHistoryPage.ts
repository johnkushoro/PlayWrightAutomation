
import { Page, Locator, expect } from '@playwright/test';
import { dataStore, ProductDetails } from '../../utils/DataStore';

export class OrderHistoryPage {
    private orderIdCells: Locator;

    constructor(private page: Page) {
        this.orderIdCells = this.page.locator("table tbody tr th[scope='row']");
    }

    private async findOrderRowById(orderId: string): Promise<Locator | null> {
        const count = await this.orderIdCells.count();

        for (let i = 0; i < count; i++) {
            const cell = this.orderIdCells.nth(i);
            const text = (await cell.innerText()).trim();

            if (text === orderId) {
                return cell.locator('..');
            }
        }

        return null;
    }

    async verifyOrderIdAppearsInHistory(): Promise<void> {
        const storedProduct = dataStore.getValue<ProductDetails>('product');
        const orderId = storedProduct?.orderIdOnConfirmationPage;

        if (!orderId) throw new Error('Order ID not found in stored product.');

        const row = await this.findOrderRowById(orderId);
        expect(row).not.toBeNull();

        const cell = row!.locator("th[scope='row']");
        await expect(cell).toHaveText(orderId);
    }

    async clickViewButtonForMatchedOrder(): Promise<void> {
        const storedProduct = dataStore.getValue<ProductDetails>('product');
        const orderId = storedProduct?.orderIdOnConfirmationPage;

        if (!orderId) throw new Error('Order ID not found in stored product.');

        const row = await this.findOrderRowById(orderId);
        if (!row) throw new Error('Matching order ID not found in history.');

        const viewButton = row.locator('button.btn-primary');
        await viewButton.click();
    }
}
