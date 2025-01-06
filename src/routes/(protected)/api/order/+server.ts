import { db } from '$server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isLoggedIn } from '$lib/authentication';

export const GET = (async ({ cookies }) => {
    const user = isLoggedIn(cookies);
    if (!user) {
        console.log('Unauthorized access attempt');
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Fetching orders...');
    const orders = await db.getOrders();
    console.log('Fetched orders:', orders);

    return json({ data: orders });
}) satisfies RequestHandler;