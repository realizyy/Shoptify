import { db } from '$server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async () => {
  const carts = await db.getCarts();

  return json({ data: carts });
}) satisfies RequestHandler;

