<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';
    import type { ProductCart } from '$lib/types';
  
    export let isOpen = false;
    let cartItems: ProductCart[] = [];
  
    const dispatch = createEventDispatcher();
  
    function closeModal() {
      dispatch('close');
    }
  
    function incrementQty(item: ProductCart) {
      item.quantity += 1;
      saveCart();
    }
  
    function decrementQty(item: ProductCart) {
      if (item.quantity > 1) {
        item.quantity -= 1;
        saveCart();
      }
    }
  
    function saveCart() {
      sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  
    function loadCart() {
      const savedCart = sessionStorage.getItem('cartItems');
      if (savedCart) {
        cartItems = JSON.parse(savedCart);
      }
    }
  
    onMount(() => {
      loadCart();
    });
  </script>
  
  {#if isOpen}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Your Cart</h2>
        {#if cartItems.length === 0}
          <p>Your cart is empty.</p>
        {:else}
          {#each cartItems as item}
            <div class="flex justify-between items-center border-b border-gray-200 py-2">
              <div class="flex items-center space-x-2">
                <img src={item.image} alt={item.name} class="w-12 h-12 object-cover rounded-lg" />
                <div>
                  <p class="font-bold">{item.name}</p>
                  <p class="text-gray-600">Rp. {Intl.NumberFormat('id-ID').format(item.price)}</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button on:click={() => decrementQty(item)} class="bg-gray-200 px-2 py-1 rounded">-</button>
                <p class="font-bold">{item.quantity}</p>
                <button on:click={() => incrementQty(item)} class="bg-gray-200 px-2 py-1 rounded">+</button>
              </div>
            </div>
          {/each}
          <div class="flex justify-between items-center mt-4">
            <p class="font-bold">Total</p>
            <p class="font-bold">Rp. {Intl.NumberFormat('id-ID').format(cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0))}</p>
          </div>
        {/if}
        <button class="bg-[#6c63ff] text-white px-4 py-2 rounded-full mt-3 hover:bg-purple-600 transition duration-300 w-full" on:click={closeModal}>
          Close
        </button>
      </div>
    </div>
  {/if}
  
  