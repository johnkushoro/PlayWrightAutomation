
import { request, FullConfig } from '@playwright/test';
import * as fs from 'fs';
import { Env } from './utils/Env';
import * as dotenv from 'dotenv';

dotenv.config();

async function globalSetup(config: FullConfig) {
    const requestContext = await request.newContext();

    const loginResponse = await requestContext.post(Env.getRahulAcademyLoginApiUrl(), {
        data: {
            userEmail: Env.getLoginUsername(),
            userPassword: Env.getLoginPassword(),
        },
    });

    const loginText = await loginResponse.text();
    console.log('🟢 Login status:', loginResponse.status());
    console.log('🔐 Login response body:', loginText);

    if (!loginResponse.ok()) {
        throw new Error(`Login failed with status: ${loginResponse.status()}`);
    }

    const loginData = JSON.parse(loginText);
    const token = loginData.token;

    if (!token) throw new Error('❌ No token received!');

    console.log('🔐 Token received:', token);
    fs.writeFileSync('auth.json', JSON.stringify({ token }, null, 2));


    await requestContext.dispose();
}

export default globalSetup;


