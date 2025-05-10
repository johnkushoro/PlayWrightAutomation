// 📁 utils/storageUtils.ts
import * as fs from 'fs';
import { Page } from '@playwright/test';

const localPath = 'localStorage.json';
const sessionPath = 'sessionStorage.json';

export async function saveBrowserStorage(page: Page): Promise<void> {
    const localData = await page.evaluate(() => {
        const data: Record<string, string> = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) data[key] = localStorage.getItem(key)!;
        }
        return data;
    });
    fs.writeFileSync(localPath, JSON.stringify(localData, null, 2));

    const sessionData = await page.evaluate(() => {
        const data: Record<string, string> = {};
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key) data[key] = sessionStorage.getItem(key)!;
        }
        return data;
    });
    fs.writeFileSync(sessionPath, JSON.stringify(sessionData, null, 2));
}

export async function restoreBrowserStorage(page: Page): Promise<void> {
    if (fs.existsSync(localPath)) {
        const localData = JSON.parse(fs.readFileSync(localPath, 'utf-8'));
        await page.addInitScript((storage: Record<string, string>) => {
            for (const [key, value] of Object.entries(storage)) {
                localStorage.setItem(key, value);
            }
        }, localData);
    }

    if (fs.existsSync(sessionPath)) {
        const sessionData = JSON.parse(fs.readFileSync(sessionPath, 'utf-8'));
        await page.addInitScript((storage: Record<string, string>) => {
            for (const [key, value] of Object.entries(storage)) {
                sessionStorage.setItem(key, value);
            }
        }, sessionData);
    }
}
