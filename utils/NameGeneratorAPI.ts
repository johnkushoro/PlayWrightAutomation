// utils/NameGeneratorAPI.ts

import { dataStore } from './DataStore';
import axios from 'axios';

export class NameGeneratorAPI {
    private static readonly API_URL = 'https://fakerapi.it/api/v1/persons?_quantity=1';

    static async generateAndStoreName(): Promise<void> {
        try {
            const response = await axios.get(NameGeneratorAPI.API_URL);

            const firstName = response.data.data[0].firstname;
            const lastName = response.data.data[0].lastname + 'Test';

            dataStore.setValue('firstName', firstName);
            dataStore.setValue('lastName', lastName);

            console.log(`✅ Generated First Name: ${firstName}`);
            console.log(`✅ Generated Last Name: ${lastName}`);
        } catch (error: any) {
            console.error('❌ API failed, using fallback names. Error:', error.message || error);

            const firstName = 'John';
            const lastName = 'DoeTest';

            dataStore.setValue('firstName', firstName);
            dataStore.setValue('lastName', lastName);

            console.warn('⚠️ Warning: Using fallback names.');
            console.log(`✅ (Fallback) First Name: ${firstName}`);
            console.log(`✅ (Fallback) Last Name: ${lastName}`);
        }
    }
}

