//
// import { test, expect } from '@playwright/test';
// import { getToken } from '../../utils/authUtils';
// import { Env } from '../../utils/Env';
// import { createOrder } from '../../utils/api/orderService';
//
// test('Simulate login via token, place order via API, and verify UI', async ({ page }) => {
//     const token = getToken();
//
//     await page.addInitScript((token) => {
//         window.localStorage.setItem('token', token);
//     }, token);
//
//     await page.goto(Env.getRahulAcademyUrl());
//     await expect(page.locator('text=Sign Out')).toBeVisible();
//
//     const orderNumber = await createOrder(token);
//     console.log('🆔 Order Number:', orderNumber);
//
//     await page.waitForTimeout(3000);
//
// });





// 📁 tests/placeOrder.test.ts
import { test, expect } from '@playwright/test';
import { getToken } from '../../utils/authUtils';
import { Env } from '../../utils/Env';
import { createOrder } from '../../utils/api/orderService';
import { restoreBrowserStorage, saveBrowserStorage } from '../../utils/storageUtils';

test('Simulate login, restore storage, place order via API, and verify UI', async ({ page }) => {
    const token = getToken();

    // ✅ Restore previously saved localStorage/sessionStorage before page loads
    await restoreBrowserStorage(page);

    // ✅ Optionally inject fresh token if needed
    await page.addInitScript((token) => {
        localStorage.setItem('token', token);
    }, token);

    // ✅ Navigate to the application
    await page.goto(Env.getRahulAcademyUrl());

    // ✅ Verify successful login via UI
    await expect(page.getByText('Sign Out')).toBeVisible();

    // ✅ Create an order via API
    const orderNumber = await createOrder(token);
    console.log('🆔 Order Number:', orderNumber);

    // ✅ Save localStorage/sessionStorage for future test reuse
    await saveBrowserStorage(page);
});
