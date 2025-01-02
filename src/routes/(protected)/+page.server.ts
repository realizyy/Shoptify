import { sessions } from '$lib/authentication';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  const user = sessions.isLoggedIn(cookies);
  return { user };
};
