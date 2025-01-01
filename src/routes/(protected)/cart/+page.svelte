<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
  let cartItems = [
    {
        id: 1,
        name: "The Weekend Boot Beige",
        price: 2000000,
        image: "https://thesusoutdoors.com/cdn/shop/files/sustainable-hiking-boot-beige_8e962baf-3a3e-4037-a15a-0d254d3b8e1a.png?v=1686559402&width=200",
        quantity: 1,
    },
    {
        id: 2,
        name: "The Weekend Boot Black",
        price: 4500000,
        image: "https://thesusoutdoors.com/cdn/shop/files/sustainable-hiking-boot-beige_8e962baf-3a3e-4037-a15a-0d254d3b8e1a.png?v=1686559402&width=200",
        quantity: 1,
    },
    {
        id: 3,
        name: "The Weekend Boot Brown",
        price: 7100000,
        image: "https://thesusoutdoors.com/cdn/shop/files/sustainable-hiking-boot-beige_8e962baf-3a3e-4037-a15a-0d254d3b8e1a.png?v=1686559402&width=200",
        quantity: 1,
    },
  ];
</script>

<div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center">
        <h2 class="text-3xl font-bold">Keranjang belanja Anda</h2>
    </div>
    <!-- {#each data.carts as cart}
        <p>
            IDCart : {cart.id ? cart.id : 'N/a'}
            IDUser : {cart.user_id ? cart.user_id : 'N/a'}
            Name : {cart.product_name ? cart.product_name : 'N/a'}
            Price : {cart.product_price ? cart.product_price : 'N/a'}
            Image : {cart.product_imageurl ? cart.product_imageurl : 'N/a'}
            Quantity : {cart.quantity ? cart.quantity : 'N/a'}
        </p>
    {/each} -->
    <div class="mt-8 bg-white p-4 rounded-lg">
        {#each data.carts as item}
            <div class="flex justify-between items-center border-b border-gray-200 py-2">
                <div class="flex items center space-x-2">
                    <img src={item.product_imageurl} alt={item.product_name} class="w-32 h-32 object-cover rounded-lg" />
                    <div>
                        <p class="font-semibold">{item.product_name}</p>
                        <p class="text-gray-600">Rp {Intl.NumberFormat('id-ID').format(item.product_price)}</p>
                        <p class="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                </div>
                <div class="flex items center space-x-2">
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
</div>
