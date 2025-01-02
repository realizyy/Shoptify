<script lang="ts">
  import type { PageData } from './$types';
  import { toast } from 'svelte-5-french-toast';
  export let data: PageData;
</script>
<div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center">
        <h2 class="text-3xl font-bold">Your Products</h2>
    </div>
    <div class="mt-8 bg-white p-4 rounded-lg">
        {#if data.product && data.product.length > 0}
            {#each data.product as product}
            <div class="flex justify-between items-center border-b border-gray-200 py-2">
                <div class="flex items-center space-x-2">
                    <img src=".{product.imageurl}" alt={product.name} class="w-32 h-32 object-cover rounded-lg" />
                    <div>
                        <p class="font-semibold">{product.name}</p>
                        <p class="text-gray-600">Rp {Intl.NumberFormat('id-ID').format(product.price)}</p>
                    </div>
                </div>
                <div class="flex items-start space-x-2">
                    <button class="bg-gray-200 px-2 py-1 rounded">Edit</button>
                    <button class="bg-gray-200 px-2 py-1 rounded">Delete</button>
                </div>
            </div>
            {/each}
        {:else}
            <p>No products available.</p>
        {/if}
    </div>
</div>