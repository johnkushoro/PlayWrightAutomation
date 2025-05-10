
// tests/rahulShettyAcademyProject/RegistrationTest.spec.ts
import { test, expect } from '@playwright/test';
import { generateRandomEmail, generateRandomPassword } from '../../utils/TestDataGenerator';
import { NameGeneratorAPI } from '../../utils/NameGeneratorAPI';
import { dataStore } from '../../utils/DataStore';
import { RegistrationPage } from '../../pageObjects/registrationFlowPages/RegistrationPage';
import { LoginPage } from '../../pageObjects/purchaseFlowPages/LoginPage';
import { ProductsListPage } from '../../pageObjects/purchaseFlowPages/ProductsListPage';

let registrationPage: RegistrationPage;
let loginPage: LoginPage;
let productsPage: ProductsListPage;

test('User registration with API-generated data and login verification', async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    loginPage = new LoginPage(page);
    productsPage = new ProductsListPage(page);

    await test.step('Generate user data from API and random generators', async () => {
        await NameGeneratorAPI.generateAndStoreName();
        generateRandomEmail();
        generateRandomPassword();
    });

    await test.step('Navigate to registration page and fill form', async () => {
        await registrationPage.navigateToRegistration();

        await registrationPage.fillRegistrationForm(
            dataStore.getValue('firstName'),
            dataStore.getValue('lastName'),
            dataStore.getValue('email'),
            '7123456789',
            'Student',
            'Male',
            dataStore.getValue('password'),
        );
    });

    await test.step('Submit registration and login with new credentials', async () => {
        await registrationPage.submitRegistration();
        await registrationPage.clickLoginButtonAfterRegistration();

        await loginPage.login(
            dataStore.getValue('email'),
            dataStore.getValue('password')
        );
    });

    await test.step('Validate login by loading products page', async () => {
        await productsPage.getProductCardDetails();
    });
});
