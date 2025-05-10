export class Env {
    static get(key: string): string {
        const value = process.env[key];
        if (!value) {
            throw new Error(`Environment variable ${key} is not defined`);
        }
        return value;
    }

    static getRahulAcademyUrl(): string {
        return this.get('RAHUL_ACADEMY');
    }

    static getRahulAcademyLoginApiUrl(): string {
        return this.get('LOGIN_API_URL');
    }

    static getRahulAcademyOrderCreationApiUrl(): string {
        return this.get('ORDER_CREATION_API_URL');
    }


    static getLoginUrl(): string {
        return this.get('LOGIN_URL');
    }

    static getRegisterUrl(): string {
        return this.get('REGISTER_URL');
    }

    static getDashboardUrl(): string {
        return this.get('DASHBOARD_URL');
    }

    static getProductsUrl(): string {
        return this.get('PRODUCTS_URL');
    }

    static getLoginUsername(): string {
        return this.get('RAHUL_ACADEMY_LOGIN_USER_NAME');
    }
    static getLoginPassword(): string {
        return this.get('RAHUL_ACADEMY_LOGIN_PASSWORD');
    }
    static getCvvCode(): string {
        return this.get('CVV_CODE');
    }

    static getCouponCode(): string {
        return this.get('COUPON_CODE');
    }

}
