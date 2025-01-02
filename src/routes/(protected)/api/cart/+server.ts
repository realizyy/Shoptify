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
  const newCartItem = await db.addCart(user.id, productId);

  return json(newCartItem);
}) satisfies RequestHandler;

