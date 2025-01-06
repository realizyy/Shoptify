import { db } from '$server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isLoggedIn } from '$lib/authentication';

export const GET = (async ({ cookies }) => {
  const user = isLoggedIn(cookies);
  if (!user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const carts = await db.getCarts(user.id);

  return json({ data: carts });
}) satisfies RequestHandler;

export const POST = (async ({ request, cookies }) => {
  const user = isLoggedIn(cookies);
  if (!user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { productId } = await request.json();
  const newCartItem = await db.addCarts(user.id, productId);

  return json(newCartItem);
}) satisfies RequestHandler;

export const PUT = (async ({ request, cookies }) => {
  const user = isLoggedIn(cookies);
  if (!user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id, quantity } = await request.json();
  console.log('User :', user.id, 'trying to update cart item :', id, 'with quantity :', quantity);
  const updatedCartItem = await db.updateCarts(user.id, id, quantity);

  return json(updatedCartItem);
}) satisfies RequestHandler;

export const DELETE = (async ({ request, cookies }) => {
  const user = isLoggedIn(cookies);
  if (!user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await request.json();
  console.log('User :', user.id, 'trying to delete cart item :', id);
  const deletedCartItem = await db.deleteCarts(user.id, id);

  return json(deletedCartItem);
}) satisfies RequestHandler;

