<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;

    function incrementQuantity(index: number) {
        data.carts[index].quantity += 1;
    }

    function decrementQuantity(index: number) {
        if (data.carts[index].quantity > 1) {
            data.carts[index].quantity -= 1;
        }
    }

    async function addToCart(productId: string) {
        const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId })
        });
        if (response.ok) {
            const newCartItem = await response.json();
            data.carts.push(newCartItem);
        }
    }
</script>

<div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center">
        <h2 class="text-3xl font-bold">Keranjang belanja Anda</h2>
    </div>
    <div class="mt-8 bg-white p-4 rounded-lg">
        {#each data.carts as item, index}
            <div class="flex justify-between items-center border-b border-gray-200 py-2">
                <div class="flex items-center space-x-2">
                    <img src={item.product_imageurl} alt={item.product_name} class="w-32 h-32 object-cover rounded-lg" />
                    <div>
                        <p class="font-semibold">{item.product_name}</p>
                        <p class="text-gray-600">Rp {Intl.NumberFormat('id-ID').format(item.product_price)}</p>
                        <div class="flex items-center space-x-2">
                            <button on:click={() => decrementQuantity(index)} class="bg-gray-200 px-2 py-1 rounded">-</button>
                            <div class="px-2 py-1 border border-gray-200 rounded">{item.quantity}</div>
                            <button on:click={() => incrementQuantity(index)} class="bg-gray-200 px-2 py-1 rounded">+</button>
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
        <button class="bg-[#6c63ff] text-white px-4 py-2 rounded-full hover:bg-purple-600 transition duration-300">Checkout</button>
    </div>

    <!--Modal Prompt delete item-->
    <!-- <div class="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50 hidden" id="modal">
        <div class="bg-white p-4 rounded-lg w-1/3">
            <p>Are you sure you want to delete this item?</p>
            <div class="flex justify-end mt-4 gap-x-1">
                <button class="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300">Delete</button>
                <button class="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition duration-300">Cancel</button>
            </div>
        </div>
    </div>
     -->
</div>
