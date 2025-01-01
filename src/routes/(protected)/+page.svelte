<script lang="ts">
  import type { PageData } from './$types';
  import Hero from '../../components/hero.svelte';
  export let data: PageData;
</script>

<div class="flex flex-col items-center space-y-5 w-full mb-6">
  <Hero />
  <div class="bg-gray-100 w-full py-10">
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
        <button class="bg-[#6c63ff] text-white px-4 py-2 rounded-full mt-3 hover:bg-purple-600 transition duration-300">
          Add to Cart
        </button>
      </div>
    {/each}
  </div>

</div>

<!-- <script lang="ts">
  import type { PageData } from './$types';

  // let { data }: { data: PageData } = $props();
  const data = {
    survey: [
      {
        id: 1,
        name: 'Survey 1',
        description: 'This is the first survey',
      },
      {
        id: 2,
        name: 'Survey 2',
        description: 'This is the second survey',
      },
      {
        id: 3,
        name: 'Survey 3',
        description: 'This is the third survey',
      },
    ],
  };
  
</script>

<div class="flex h-full w-full max-w-5xl flex-col items-center justify-center space-y-5">
  <div class="text-3xl font-bold">List of Survey</div>

  <div class="w-full">
    <ul class="w-full space-y-3 px-5">
      {#each data.survey as s}
        <li class="w-full">
          <a
            href="/survey/{s.id}"
            class="flex h-full w-full flex-col gap-y-3 rounded-lg bg-neutral-200 p-3 transition-colors duration-200 hover:bg-neutral-300">
            <h3 class="text-3xl font-bold">{s.name}</h3>
            <div>{s.description}</div>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</div> -->
