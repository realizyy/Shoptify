import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { sessions } from '$auth';

export const POST: RequestHandler = async ({ cookies }) => {
  sessions.del(cookies);
  throw redirect(302, '/login');
};