// 📁 utils/authUtils.ts
import * as fs from 'fs';

export function getToken(): string {
    const data = JSON.parse(fs.readFileSync('auth.json', 'utf-8'));
    return data.token;
}