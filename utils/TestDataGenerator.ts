// utils/TestDataGenerator.ts

import { dataStore } from './DataStore';

function generateRandomString(length: number): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export function generateRandomEmail(): string {
    const username = generateRandomString(8);
    const email = `${username}@gmail.com`;
    dataStore.setValue('email', email);
    console.log(`✅ Generated Email: ${email}`);
    return email;
}

export function generateRandomPassword(): string {
    const capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const smallLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialCharacters = '!@#$%^&*()';
    const allCharacters = capitalLetters + smallLetters + numbers + specialCharacters;

    let password = '';
    password += capitalLetters.charAt(Math.floor(Math.random() * capitalLetters.length));
    password += smallLetters.charAt(Math.floor(Math.random() * smallLetters.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));

    const remainingLength = 6;
    for (let i = 0; i < remainingLength; i++) {
        password += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
    }

    password = password.split('').sort(() => Math.random() - 0.5).join('');

    dataStore.setValue('password', password);
    console.log(`✅ Generated Password: ${password}`);
    return password;
}
