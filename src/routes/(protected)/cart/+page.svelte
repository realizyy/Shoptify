<script lang="ts">
    import { env } from '$env/dynamic/public';
    const MIDTRANS_CLIENT_KEY = env['PUBLIC_MIDTRANS_CLIENT_KEY'];
    import type { PageData } from './$types';
    import { onMount } from 'svelte';
    export let data: PageData;

    async function updateQuantity(id: string, quantity: number) {
        const response = await fetch('/api/cart', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, quantity })
        });
        if (!response.ok) {
            console.log('Failed to update cart item');
        }
    }

    async function deleteItem(id: string) {
        const response = await fetch('/api/cart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        if (!response.ok) {
            console.log('Failed to delete cart item');
        }
    }

    function incrementQuantity(index: number) {
        try {
            data.carts[index].quantity++;
            updateQuantity(data.carts[index].id, data.carts[index].quantity);
        } catch (error) {
            console.error('Failed to update quantity', error);
        }
    }

    function decrementQuantity(index: number) {
        try {
            if (data.carts[index].quantity === 1) {
                deleteItem(data.carts[index].id);
                data.carts.splice(index, 1);
            } else {
                data.carts[index].quantity--;
            }
            updateQuantity(data.carts[index].id, data.carts[index].quantity);
        } catch (error) {
            console.error('Failed to update quantity', error);
        }
    }
    async function checkout() {
        const grossAmount = data.carts.reduce((acc, item) => acc + (item.product_price * item.quantity), 0);
        const goods = data.carts.map(item => ({
            id: item.id,
            price: item.product_price,
            quantity: item.quantity,
            name: item.product_name
        }));

        const response = await fetch('/api/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                goods,
                grossAmount,
            })
        });

        const transaction = await response.json();
        if (transaction){
            window.snap.pay(transaction);
        } else {
            console.log('Failed to create transaction');
        }
    }

    onMount(() => {
        let script = document.createElement('script');

        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        if (MIDTRANS_CLIENT_KEY) {
            script.setAttribute('data-client-key', MIDTRANS_CLIENT_KEY);
        }
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    });
</script>

<div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center">
        <h2 class="text-3xl font-bold">Keranjang belanja Anda</h2>
    </div>
    <div class="mt-8 bg-white p-4 rounded-lg">
        {#if data.carts.length === 0}
            <p class="text-center">Keranjang belanja Anda kosong</p>
        {/if}
        {#each data.carts as item, index}
            <div class="flex justify-between items-center border-b border-gray-200 py-2">
                <div class="flex items-center space-x-2">
                    <img src={item.product_imageurl} alt={item.product_name} class="w-32 h-32 object-cover rounded-lg" />
                    <div>
                        <p class="font-semibold">{item.product_name}</p>
                        <p class="text-gray-600">Rp {Intl.NumberFormat('id-ID').format(item.product_price)}</p>
                        <div class="flex items-center space-x-3">
                            <button on:click={() => decrementQuantity(index)} class="bg-gray-200 px-3 py-1 rounded">-</button>
                            <div class="px-3 py-1 border border-gray-200 rounded">{item.quantity}</div>
                            <button on:click={() => incrementQuantity(index)} class="bg-gray-200 px-3 py-1 rounded">+</button>
                            <button on:click={() => deleteItem(item.id)} class="bg-gray-200 px-3 py-1 rounded" aria-label="Delete item">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256">
                                    <g fill="#ff0000" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-size="none" style="mix-blend-mode: normal"><g transform="scale(4,4)"><path d="M28,7c-2.757,0 -5,2.243 -5,5v3h-10c-1.104,0 -2,0.896 -2,2c0,1.104 0.896,2 2,2h2.10938l1.68359,30.33203c0.178,3.178 2.80723,5.66797 5.99023,5.66797h18.43359c3.182,0 5.81223,-2.48997 5.99023,-5.66797l1.68359,-30.33203h2.10938c1.104,0 2,-0.896 2,-2c0,-1.104 -0.896,-2 -2,-2h-10v-3c0,-2.757 -2.243,-5 -5,-5zM28,11h8c0.552,0 1,0.449 1,1v3h-10v-3c0,-0.551 0.448,-1 1,-1zM19.11328,19h25.77344l-1.67383,30.10938c-0.059,1.06 -0.93509,1.89063 -1.99609,1.89063h-18.43359c-1.06,0 -1.93709,-0.82967 -1.99609,-1.88867zM32,23.25c-0.967,0 -1.75,0.784 -1.75,1.75v20c0,0.966 0.783,1.75 1.75,1.75c0.967,0 1.75,-0.784 1.75,-1.75v-20c0,-0.966 -0.783,-1.75 -1.75,-1.75zM24.64258,23.25195c-0.965,0.034 -1.7205,0.84259 -1.6875,1.80859l0.69727,20.08594c0.033,0.945 0.81005,1.68945 1.74805,1.68945c0.021,0 0.0415,0 0.0625,0c0.965,-0.034 1.7205,-0.84455 1.6875,-1.81055l-0.69727,-20.08594c-0.034,-0.965 -0.84655,-1.7105 -1.81055,-1.6875zM39.35547,23.25195c-0.967,-0.027 -1.77459,0.7225 -1.80859,1.6875l-0.69727,20.08594c-0.034,0.966 0.7215,1.77655 1.6875,1.81055c0.021,0.001 0.0415,0 0.0625,0c0.938,0 1.71505,-0.74445 1.74805,-1.68945l0.69727,-20.08594c0.034,-0.966 -0.72345,-1.77459 -1.68945,-1.80859z"></path></g></g>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                </div>
            </div>
        {/each}
    </div>
    <div class="flex justify-end items-center border-t border-gray-200 mt-4 pt-4">
        <span class="text-gray-600 mr-4">Subtotal:</span>
        <span class="font-semibold">Rp {Intl.NumberFormat('id-ID').format(data.carts.reduce((acc, item) => acc + (item.product_price * item.quantity), 0))}</span>
    </div>
    <div class="flex justify-end mt-4">
        <button on:click={checkout} class="bg-[#6c63ff] text-white px-4 py-2 rounded-full hover:bg-purple-600 transition duration-300">Checkout</button>
    </div>

    <!-- Modal Prompt delete item-->
    <div class="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50" id="modalDelete" style="display: none;">
        <div class="bg-white p-4 rounded-lg w-1/3">
            <p>Are you sure you want to delete this item?</p>
            <div class="flex justify-end mt-4 gap-x-1">
                <button class="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300">Delete</button>
                <button class="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition duration-300">Cancel</button>
            </div>
        </div>
    </div>
</div>
