import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
// import midtransClient from 'midtrans-client';

const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: 'ENV_SANDBOX_SERVER_KEY',
    clientKey: 'ENV_SANDBOX_CLIENT_KEY'
});

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { orderId, grossAmount, customerDetails } = await request.json();

        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: grossAmount
            },
            customer_details: customerDetails
        };

        const transaction = await snap.createTransaction(parameter);
        return json(transaction);
    } catch {
        return json({ error: 'Failed to create transaction' }, { status: 500 });
    }
};
