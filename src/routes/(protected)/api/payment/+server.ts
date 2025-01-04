import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import midtrans from 'midtrans-client';
import { MIDTRANS_CLIENT_KEY, MIDTRANS_SERVER_KEY } from '$env/static/private';
import { faker } from '@faker-js/faker';

const snap = new midtrans.Snap({
    isProduction: false,
    serverKey: MIDTRANS_SERVER_KEY,
    clientKey: MIDTRANS_CLIENT_KEY
});


export const POST: RequestHandler = async ({ request }) => {
    try {
        console.log('Trying to create payment...\nRequest body from client:', request.body);
        const { grossAmount, goods } = await request.json();

        const parameter = {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            item_details: goods.map((good: any) => ({
                id: good.id,
                name: good.name,
                price: good.price,
                quantity: good.quantity
            })),
            transaction_details: {
                order_id: `ORDER-${Date.now()}`,
                gross_amount: grossAmount
            },
            customer_details: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                phone: faker.phone.number({
                    style: 'international'
                })
            }
        };
        console.log('Parameter:', parameter);

        const transaction = await snap.createTransaction(parameter);
        console.log('Success create transaction:', transaction);
        return json(transaction.token);
    } catch {
        return json({ error: 'Failed to create transaction' }, { status: 500 });
    }
};
