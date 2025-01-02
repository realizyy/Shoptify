import { sessions } from '$lib/authentication';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  const user = sessions.isLoggedIn(cookies);
  console.log('User logged in:', user);
  return { user };
};
