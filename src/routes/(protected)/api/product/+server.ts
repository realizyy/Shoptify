import { db } from '$server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async () => {
  const product = await db.getProducts();

  return json({ data: product });
}) satisfies RequestHandler;
