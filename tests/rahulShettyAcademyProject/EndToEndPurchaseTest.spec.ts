
// tests/rahulShettyAcademyProject/EndToEndPurchaseTest.spec.ts
import { test, expect } from '@playwright/test';
import { Env } from '../../utils/Env';
import { LoginPage } from '../../pageObjects/purchaseFlowPages/LoginPage';
import { ProductsListPage } from '../../pageObjects/purchaseFlowPages/ProductsListPage';
import { CartPage } from '../../pageObjects/purchaseFlowPages/CartPage';
import { PaymentPage } from '../../pageObjects/purchaseFlowPages/PaymentPage';
import { OrderConfirmationPage } from '../../pageObjects/purchaseFlowPages/OrderConfirmationPage';
import { OrderHistoryPage } from '../../pageObjects/purchaseFlowPages/OrderHistoryPage';
import { OrderSummaryPage } from '../../pageObjects/purchaseFlowPages/OrderSummaryPage';

let loginPage: LoginPage;
let productsPage: ProductsListPage;
let cartPage: CartPage;
let paymentPage: PaymentPage;
let orderConfirmationPage: OrderConfirmationPage;
let orderHistoryPage: OrderHistoryPage;
let orderSummaryPage: OrderSummaryPage;

test.beforeEach(async ({ page }) => {
    // Instantiate all page objects
    loginPage = new LoginPage(page);
    productsPage = new ProductsListPage(page);
    cartPage = new CartPage(page);
    paymentPage = new PaymentPage(page);
    orderConfirmationPage = new OrderConfirmationPage(page);
    orderHistoryPage = new OrderHistoryPage(page);
    orderSummaryPage = new OrderSummaryPage(page);

    await test.step('Navigate to login and login as valid user', async () => {
        await loginPage.navigateToLoginPage();
        await loginPage.login(Env.getLoginUsername(), Env.getLoginPassword());
    });
});

test('End-to-end purchase flow: login, add product, checkout, confirm', async ({ page }) => {
    await test.step('Add product to cart and verify cart page', async () => {
        await productsPage.addProductToCartByIndex(1);
        await productsPage.clickCartButton();
        await cartPage.verifyProductDetails();
        await cartPage.clickCheckOutButton();
    });

    await test.step('Complete payment with coupon and place order', async () => {
        await paymentPage.enterCvv(Env.getCvvCode());
        await paymentPage.verifyEmailPrefilled();
        await paymentPage.verifyEmailLabel();
        await paymentPage.selectCountry('United Kingdom');
        await paymentPage.applyCoupon(Env.getCouponCode());
        await paymentPage.clickPlaceOrderButton();
    });

    await test.step('Verify order confirmation and navigate to order history', async () => {
        await orderConfirmationPage.verifyOrderConfirmationMessage();
        await orderConfirmationPage.verifyProductDetailsOnOrderConfirmationPage();
        await orderConfirmationPage.navigateToOrderHistoryPage();
    });

    await test.step('Check order ID appears in history and matches on summary page', async () => {
        await orderHistoryPage.verifyOrderIdAppearsInHistory();
        await orderHistoryPage.clickViewButtonForMatchedOrder();
        await orderSummaryPage.verifyOrderItemsOnSummaryPage();
    });
});
