
import { request } from '@playwright/test';
import { Env } from '../Env';
import { orderPayload } from '../../data/orderPayload';
import * as fs from 'fs';

export async function createOrder(token: string): Promise<string> {
    const requestContext = await request.newContext({
        extraHTTPHeaders: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
    });

    const response = await requestContext.post(
        Env.getRahulAcademyOrderCreationApiUrl(),
        { data: orderPayload }
    );

    if (response.status() !== 201) {
        throw new Error(`Failed to create order. Status: ${response.status()}`);
    }

    const body = await response.json();
    console.log('🟢 Order Placement Status:', response.status());
    console.log('✅ Order placed:', body);

    // ✅ Loop through the payload and log all quantities
    console.log('🧾 Order Quantities:');
    orderPayload.orders.forEach((order, index) => {
        console.log(`   🔹 Item ${index + 1}: productOrderedId = ${order.productOrderedId}, quantity: ${order.quantity}`);
    });

    const orderId = body.orders[1] || 'No ID returned';
    fs.writeFileSync('order.json', JSON.stringify({ orderId }, null, 2));

    await requestContext.dispose();
    return orderId;
}