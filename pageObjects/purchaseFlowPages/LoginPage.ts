
// pageObjects/LoginPage.ts
import { Page, expect } from '@playwright/test';
import {dataStore} from "../../utils/DataStore";
import {Env} from "../../utils/Env";

export class LoginPage {
    constructor(private page: Page) {}

    userEmailField = () => this.page.locator('#userEmail');
    userPasswordField = () => this.page.locator('#userPassword');
    loginButton = () => this.page.locator('#login');
    dashboardTitle = () => this.page.locator('div.left.mt-1 h3');

    async navigateToLoginPage() {
        await this.page.goto(Env.getRahulAcademyUrl());
    }

    async login(email: string, password: string) {
        await this.userEmailField().fill(email);
        await this.userPasswordField().fill(password);
        await this.loginButton().click();

        dataStore.setValue("loggedInEmail", email);

        await expect(this.dashboardTitle()).toHaveText('Automation');
    }
}
