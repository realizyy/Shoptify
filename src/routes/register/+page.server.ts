import type { Actions } from './$types';
import { account } from '$auth';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const user = await account.create(username, password);
    if (user) {
      throw redirect(302, '/login');
    } else {
      console.log('Failed to register user');  
      return { message: 'Failed to register user' };
    }
  }
} satisfies Actions;