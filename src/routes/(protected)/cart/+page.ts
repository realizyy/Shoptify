import type { PageLoad } from './$types';
import type { ProductCart } from '$types';

export const load = (async ({ fetch }) => {
    const res = await fetch('/api/cart');
    const { data: carts }: { data: ProductCart[] } = await res.json();

    return { carts };
}) satisfies PageLoad;
    


// import type { PageLoad } from './$types';
// import type { Product } from '$types';

// export const load = (async ({ fetch }) => {
//   const res = await fetch('/api/product');
//   const { data: product }: { data: Product[] } = await res.json();

//   return { product };
// }) satisfies PageLoad;

