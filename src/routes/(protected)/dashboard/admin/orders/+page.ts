import type { PageLoad } from './$types';
import type { Order } from '$types';

export const load = (async ({ fetch }) => {
    try {
        const res = await fetch('/api/order');
        if (res.ok) {
            const data = await res.json();
            const { data: orders }: { data: Order[] } = data;
            return { orders };
        } else {
            console.error('Failed to fetch orders, status:', res.status);
            return { status: res.status, error: 'Failed to fetch orders' };
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
        return { status: 500, error: 'Failed to fetch orders' };
    }
}) satisfies PageLoad;