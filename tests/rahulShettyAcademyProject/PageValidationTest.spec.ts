
import { test, expect } from "@playwright/test";

test.describe("Page Validation Test", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    });

    test("should toggle visibility of the text box", async ({ page }) => {
        await expect(page.locator("#displayed-text")).toBeVisible();
        await page.locator("#hide-textbox").click();
        await expect(page.locator("#displayed-text")).toBeHidden();
    });

    test("should accept the confirmation popup", async ({ page }) => {
        page.on("dialog", async (dialog) => {
            await dialog.accept();
        });
        await page.locator("#confirmbtn").click();
    });

    test("should hover and click by text", async ({ page }) => {
        await page.locator("#mousehover").hover();
        const dropDownDisplayButton = page.locator(".mouse-hover-content a", { hasText: "Reload" });
        await dropDownDisplayButton.waitFor();
        await dropDownDisplayButton.click();
    });

    test("handling iFrames", async ({ page }) => {
        const iframeSelector = "#courses-iframe";
        const linkText = "Mentorship";
        const framesPage = page.frameLocator(iframeSelector);
        const targetLink = framesPage.getByRole("link", { name: linkText });

        await expect(targetLink).toBeVisible();
        await targetLink.click();
    });
});
