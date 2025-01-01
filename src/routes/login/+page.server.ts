import type { Actions } from './$types';
import { sessions, account } from '$auth';
import { jwt } from '$server';
import { redirect } from '@sveltejs/kit';

// Login dengan username dan password
export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const user = await account.getUser(username, password);
    if (user) {
      const token = jwt.createToken(user);
      sessions.set(token, cookies);
      throw redirect(302, '/');
    } else {
      console.log('Invalid username or password');
      return { message: 'Invalid username or password' };
    }
  }
} satisfies Actions;

// Guest login
// export const actions = {
//   default: async ({ cookies }) => {
//     const guest = account.create();
//     const token = jwt.createToken(guest);

//     sessions.set(token, cookies);

//     redirect(302, '/');
//   }
// } satisfies Actions;
