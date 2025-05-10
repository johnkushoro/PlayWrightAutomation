import { Page, Locator } from '@playwright/test';

export class CalendarPage {
    private calendarInput: Locator;
    private calendarLabel: Locator;
    private yearButtons: Locator;
    private monthButtons: Locator;
    private dayButtons: Locator;
    private dayInput: Locator;
    private monthInput: Locator;
    private yearInput: Locator;

    constructor(private page: Page) {
        this.calendarInput = this.page.locator('.react-date-picker__inputGroup');
        this.calendarLabel = this.page.locator('.react-calendar__navigation__label__labelText--from');
        this.yearButtons = this.page.locator('.react-calendar__decade-view__years__year');
        this.monthButtons = this.page.locator('.react-calendar__year-view__months__month');
        this.dayButtons = this.page.locator('.react-calendar__month-view__days__day');
        this.dayInput = this.page.locator('input[name="day"]');
        this.monthInput = this.page.locator('input[name="month"]');
        this.yearInput = this.page.locator('input[name="year"]');
    }

    async navigate() {
        await this.page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    }

    async openCalendar() {
        await this.calendarInput.click();
        await this.calendarLabel.dblclick();
        await this.page.waitForTimeout(2000);
    }

    async selectYear(year: string) {
        await this.yearButtons.first().waitFor();

        const yearCount = await this.yearButtons.count();
        for (let i = 0; i < yearCount; i++) {
            const button = this.yearButtons.nth(i);
            const text = await button.textContent();
            if (text?.trim() === year) {
                await button.click();
                console.log(`Clicked year: ${year}`);
                return;
            }
        }

        throw new Error(`Year ${year} not found in the calendar.`);
    }

    async selectMonth(month: string) {
        await this.monthButtons.first().waitFor();

        const monthCount = await this.monthButtons.count();
        for (let i = 0; i < monthCount; i++) {
            const button = this.monthButtons.nth(i);
            const abbr = await button.locator('abbr');
            const ariaLabel = await abbr.getAttribute('aria-label');

            if (ariaLabel?.startsWith(month)) {
                await button.click();
                console.log(`Clicked month: ${month}`);
                return;
            }
        }

        throw new Error(`Month ${month} not found in the calendar.`);
    }

    async selectDate(date: string) {
        await this.dayButtons.first().waitFor();

        const dayCount = await this.dayButtons.count();
        for (let i = 0; i < dayCount; i++) {
            const button = this.dayButtons.nth(i);
            const abbr = await button.locator('abbr');
            const abbrText = await abbr.textContent();
            const ariaLabel = await abbr.getAttribute('aria-label');

            if (abbrText?.trim() === date && ariaLabel) {
                await button.click();
                const weekday = new Date(ariaLabel).toLocaleDateString('en-US', { weekday: 'long' });

                console.log(`✅ Clicked on date: ${ariaLabel}`);
                console.log(`📅 That day is: ${weekday}`);
                await this.page.waitForTimeout(7000);
                return;
            }
        }

        throw new Error(`Date ${date} not found.`);
    }

    async getDisplayedDate(): Promise<string> {
        const day = await this.dayInput.inputValue();
        const month = await this.monthInput.inputValue();
        const year = await this.yearInput.inputValue();

        return `${day.padStart(2, '0')} / ${month.padStart(2, '0')} / ${year}`;
    }
}
