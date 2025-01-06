import { db } from '$server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import midtrans from 'midtrans-client';
import { MIDTRANS_CLIENT_KEY, MIDTRANS_SERVER_KEY } from '$env/static/private';
import { faker } from '@faker-js/faker';
import { isLoggedIn } from '$lib/authentication';

const snap = new midtrans.Snap({
    isProduction: false,
    serverKey: MIDTRANS_SERVER_KEY,
    clientKey: MIDTRANS_CLIENT_KEY
});

export const POST: RequestHandler = async ({ request, cookies }) => {
    try {
        const user = isLoggedIn(cookies);
        console.log('Trying to create payment...\nRequest body from client:', request.body);
        const { grossAmount, goods } = await request.json();

        const parameter = {
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

        if (user) {
            try {
                const order = {
                    id: `ORDER-${Date.now()}`
                    user_id: user.id,
                    total: grossAmount,
                    status: 'pending', // as default pending, need to update from admin to confirm the order.
                    payment_method: 'midtrans', // need to update dynamically from client midtrans. qr, gopay, etc.
                    payment_status: 'pending', // as default pending, need to update from midtrans callback.
                    order_date: new Date()
                };
                const orderItems = goods.map((good: any) => ({
                    order_id: order.id,
                    product_id: good.id,
                    quantity: good.quantity,
                    product_name: good.name,
                    product_price: good.price,
                    product_imageurl: good.imageurl
                }));
                const result = await db.addOrders(order, orderItems);
                console.log('Adding order, result:', result);
            } catch (error) {
                console.error('Error adding order:', error);
            }
        } else {
            console.error('Unauthorized user trying to create payment');
        }

        console.log('Success create transaction:', transaction);

        if (user) {
            try {
                let count = 0;
                for (const good of goods) {
                    await db.deleteCarts(user.id, good.id);
                    count++;
                }
                console.log('Deleting ', count, 'items from carts after transaction success');
            } catch (error) {
                console.error('Error deleting carts:', error);
            }
        } else {
            console.error('Unauthorized user trying to delete carts');
        }

        return json(transaction.token);
    } catch {
        return json({ error: 'Failed to create transaction' }, { status: 500 });
    }
};