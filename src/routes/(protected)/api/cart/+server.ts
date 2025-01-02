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

