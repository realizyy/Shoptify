import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit';
import { i18n } from '$lib/i18n';
import { sequence } from '@sveltejs/kit/hooks';
import { sessions } from '$auth';
import { errorMessage } from '$stores';
import { jwt } from '$server';

type EventType = RequestEvent<Partial<Record<string, string>>, string | null>;

const setUserLocals = (token: string, event: EventType) => {
  const user = jwt.verifyToken(token);
  event.locals.user = user;
};

const auth = (async ({ event, resolve }) => {
  const token = sessions.get(event.cookies);

  if (event.route.id?.startsWith('/(protected)')) {
    errorMessage.set(null);
    if (!token || !jwt.verifyToken(token)) {
      return redirect(302, '/login');
    }

    const user = jwt.verifyToken(token);
    if (!user) {
      errorMessage.set('You need to login again.');
      return redirect(302, '/login');
    }
    setUserLocals(token, event);

    // Redirect admin users to /dashboard/admin if they are not already there, except for /api/logout
    if (user.role === 'admin' && event.url.pathname !== '/dashboard/admin' && 
      !event.url.pathname.startsWith('/dashboard') && 
      event.url.pathname !== '/api/logout' &&
      event.url.pathname !== '/api/product' &&
      event.url.pathname !== '/api/order'
    ) {
      return redirect(302, '/dashboard/admin');
    }

    // Redirect non-admin users to /
    if (user.role !== 'admin' && event.url.pathname === '/dashboard/admin') {
      return redirect(302, '/');
    }

  } else if (event.url.pathname === '/login') {
    if (!token) {
      errorMessage.set(null);
      return await resolve(event);
    }
    const user = jwt.verifyToken(token);
    if (user) {
      errorMessage.set(null);
      setUserLocals(token, event);
      if (user.role === 'admin') {
        return redirect(302, '/dashboard/admin');
      } else {
        return redirect(302, '/');
      }
    }
  }

  return await resolve(event);
}) satisfies Handle;

export const handle = sequence(i18n.handle(), auth) satisfies Handle;
