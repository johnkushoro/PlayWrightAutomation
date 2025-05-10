
import { expect, Locator, Page } from '@playwright/test';
import {Env} from "../../utils/Env";

export class RegistrationPage {
    constructor(private page: Page) {}

    // Locators
    private registrationLink = this.page.locator('p.login-wrapper-footer-text a.text-reset');
    private firstNameInput = this.page.locator('#firstName');
    private lastNameInput = this.page.locator('#lastName');
    private emailInput = this.page.locator('#userEmail');
    private phoneNumberInput = this.page.locator('#userMobile');
    private occupationDropdown = this.page.locator('select.custom-select');
    private genderRadioButton = (gender: string) => this.page.locator(`input[value='${gender}']`);
    private passwordInput = this.page.locator('#userPassword');
    private confirmPasswordInput = this.page.locator('#confirmPassword');
    private termsCheckbox = this.page.locator("input[type='checkbox']");
    private loginButton = this.page.locator('#login');
    private registrationSuccessMessage = this.page.locator('h1.headcolor');
    private registrationLoginButton = this.page.locator('.btn.btn-primary');


    // Actions
    async navigateToRegistration(): Promise<void> {
        await this.page.goto(Env.getRahulAcademyUrl());
        await this.registrationLink.waitFor({ state: 'visible' });
        await this.registrationLink.click();
    }


    async fillRegistrationForm(
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        occupation: string = 'Student',
        gender: string,
        password: string,
    ): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.phoneNumberInput.fill(phoneNumber);
        await this.occupationDropdown.selectOption({ label: occupation });
        await this.genderRadioButton(gender).check();
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
        await this.termsCheckbox.check();
    }

    async submitRegistration(): Promise<void> {
        await this.loginButton.click();
        await this.registrationSuccessMessage.waitFor({ state: 'visible' });
        await expect(this.registrationSuccessMessage).toHaveText('Account Created Successfully');
    }

    async clickLoginButtonAfterRegistration(): Promise<void> {
        await this.registrationLoginButton.click();
    }


}
