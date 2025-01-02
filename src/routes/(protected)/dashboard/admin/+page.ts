import type { PageLoad } from './$types';
import type { Product } from '$types';

export const load = (async ({ fetch }) => {
    try {
        const res = await fetch('/api/product');
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError('Expected JSON response');
        }
        const { data: product }: { data: Product[] } = await res.json();
        return { product };
    } catch (error) {
        console.error('Error fetching products:', error);
        return { product: [] };
    }
}) satisfies PageLoad;
