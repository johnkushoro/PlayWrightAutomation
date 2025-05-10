
import { test, expect } from '@playwright/test';
import { CalendarPage } from '../../pageObjects/calendar/CalendarPage';

test('Calendar Validation', async ({ page }) => {
    const calendar = new CalendarPage(page);

    const year = '2024';
    const month = 'July';
    const date = '19';

    await calendar.navigate();
    await calendar.openCalendar();
    await calendar.selectYear(year);
    await calendar.selectMonth(month);
    await calendar.selectDate(date);

    const expectedMonth = String(new Date(`${month} 1`).getMonth() + 1).padStart(2, '0');
    const expectedDate = `${date.padStart(2, '0')} / ${expectedMonth} / ${year}`;
    const displayedDate = await calendar.getDisplayedDate();

    expect(displayedDate).toBe(expectedDate);
    console.log(`🎯 Confirmed displayed date: ${displayedDate}`);
    console.log(`🎯 Confirmed expected date: ${expectedDate}`);
});
