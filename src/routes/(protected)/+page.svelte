<script lang="ts">
  import type { PageData } from './$types';
  import { toast } from 'svelte-5-french-toast';
  import Hero from '../../components/hero.svelte';
  export let data: PageData;

  async function addToCart(productId: string) {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId })
    });
    if (response.ok) {
      toast.success('Product added to cart');
    } else {
      toast.error('Failed to add product, cause: ' + response.statusText);
    }
  }
</script>

<div class="flex flex-col items-center space-y-5 w-full mb-6">
  <Hero />
  <div class="bg-gray-300 w-full py-10">
    <div class="container mx-auto">
      <h2 id="best-product" class="text-3xl font-bold">Our Best Products</h2>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mx-5">
    {#each data.product as products}
      <div class="bg-white rounded-lg shadow-md p-5">
        <img src={products.imageurl} alt={products.name} class="w-auto object-cover" />
        <h3 class="text-xl font-bold mt-3">{products.name}</h3>
        <p class="text-gray-600 mt-1">Rp. {Intl.NumberFormat('id-ID').format(products.price)}</p>
        <button on:click={() => addToCart(products.id)} class="bg-[#6c63ff] text-white px-4 py-2 rounded-full mt-3 hover:bg-purple-600 transition duration-300">
          Add to Cart
        </button>
      </div>
    {/each}
  </div>
</div>
