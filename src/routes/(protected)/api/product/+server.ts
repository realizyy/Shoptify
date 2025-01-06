import { db } from '$server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {isLoggedIn} from "$auth";

export const GET = (async () => {
  const product = await db.getProducts();

  return json({ data: product });
}) satisfies RequestHandler;

export const POST = (async ({ request, cookies }) => {
    const user = isLoggedIn(cookies);
    if (!user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, price, imageurl } = await request.json();
    console.log('User :', user.id, 'trying to add product item :', name);
    const newCartItem = await db.addProducts(name, price, imageurl);

    return json(newCartItem);
}) satisfies RequestHandler;

export const PUT = (async ({ request, cookies }) => {
    const user = isLoggedIn(cookies);
    if (!user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, name, price, imageurl } = await request.json();
    console.log('User :', user.id, 'trying to update product item :', id);
    const updatedCartItem = await db.updateProducts(id, name, price, imageurl);

    return json(updatedCartItem);
}) satisfies RequestHandler;

export const DELETE = (async ({ request, cookies }) => {
    const user = isLoggedIn(cookies);
    if (!user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await request.json();
    console.log('User :', user.id, 'trying to delete product item :', id);
    const deletedCartItem = await db.deleteProducts(id);

    return json(deletedCartItem);
}) satisfies RequestHandler;