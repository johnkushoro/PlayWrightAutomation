import { test, expect } from '@playwright/test';

test('Error Message for Incorrect Credentials', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const title = await page.title();
    console.log(title);
    await page.locator('#username').fill('rahulshetty');
    await page.locator('#password').fill('learning');
    await page.locator('#terms').check();
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator(("[style*='block']"))).toHaveText('Incorrect username/password.');
    //await expect(page).toHaveTitle('Login Successful');


});

test('Correct Login Entry', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const title = await page.title();
    console.log(title);
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('learning');
    await page.locator('#terms').check();
    await page.locator('#signInBtn').click();
    await expect(page).toHaveTitle('ProtoCommerce');
});


test('should have the correct page title', async ({ page }) => {
    await page.goto('https://google.com');
    const title = await page.title();
    console.log(title);
    await expect(page).toHaveTitle('Google');
});