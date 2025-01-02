<script lang="ts">
  import { page } from '$app/stores';
  import { toast } from 'svelte-5-french-toast';

  let showDropdown = false;

  function handlerCart() {
    window.location.href = '/cart';
  }

  function toggleDropdown() {
    showDropdown = !showDropdown;
  }

  function closeDropdown() {
    showDropdown = false;
  }

  function profile() {
    toast.error("Profile page is not available yet");
  }

  async function logout() {
    const response = await fetch('/api/logout', {
      method: 'POST',
      credentials: 'same-origin'
    });
    if (response.ok) {
      toast("Logged out successfully");
      window.location.href = '/login';
    } else {
      toast.error("Failed to logout, " + response.statusText);
    }
  }
</script>

<header class="bg-white shadow-lg sticky top-0 z-50 transition-opacity duration-500 rounded-b-lg">
  <div class="container mx-auto px-4 py-4 flex justify-between items-center">
    <div class="flex items-center space-x-4">
      <a href="/" class="text-2xl font-bold text-gray-800">Shoptify</a>
    </div>
    <div class="flex items-center space-x-4">
      <button onclick={handlerCart} class="text-gray-600 hover:text-gray-900 bg-transparent hover:bg-gray-200 p-2 rounded" aria-label="cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13.8888 6.66666V5.02777C13.8888 3.63841 13.1476 2.35458 11.9444 1.6599C10.7412 0.965215 9.25873 0.965215 8.0555 1.6599C6.85227 2.35458 6.11106 3.63841 6.11106 5.02777V8.91666C6.11106 9.22349 6.35979 9.47222 6.66661 9.47222C6.97344 9.47222 7.22217 9.22349 7.22217 8.91666V7.77777H11.6666V6.66666H7.22217V5.02777C7.22217 3.49365 8.46582 2.25 9.99995 2.25C11.5341 2.25 12.7777 3.49365 12.7777 5.02777V8.88889C12.7777 9.19571 13.0265 9.44444 13.3333 9.44444C13.6401 9.44444 13.8888 9.19571 13.8888 8.88889V7.77777H16.6666V17.7778H3.33328V7.77777H4.99995V6.66666H2.22217V17.8278C2.22217 18.4138 2.69724 18.8889 3.28328 18.8889H16.7166C17.3026 18.8889 17.7777 18.4138 17.7777 17.8278V6.66666H13.8888Z" fill="#272724"></path>
        </svg>
      </button>
      <div class="relative">
        <button onclick={toggleDropdown} class="text-gray-600 hover:text-gray-900 bg-transparent hover:bg-gray-200 p-2 rounded" aria-label="profile">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 9.44444C12.1478 9.44444 13.8889 7.70333 13.8889 5.55556C13.8889 3.40778 12.1478 1.66667 10 1.66667C7.85223 1.66667 6.11111 3.40778 6.11111 5.55556C6.11111 7.70333 7.85223 9.44444 10 9.44444ZM10.0028 10.5576C12.6227 10.5576 15.1272 11.6358 16.9278 13.5389C17.1189 13.7461 17.2242 14.0181 17.2222 14.3V17.2222C17.2222 17.8359 16.7248 18.3333 16.1111 18.3333H3.88889C3.27524 18.3333 2.77778 17.8359 2.77778 17.2222V14.3C2.77734 14.0174 2.88462 13.7452 3.07778 13.5389C4.87839 11.6358 7.38285 10.5576 10.0028 10.5576ZM3.88889 14.2944V17.2222H16.1111V14.2944C14.5199 12.619 12.3106 11.6703 10 11.6703C7.68936 11.6703 5.48006 12.619 3.88889 14.2944ZM12.7778 5.55556C12.7778 4.02143 11.5341 2.77778 10 2.77778C8.46588 2.77778 7.22223 4.02143 7.22223 5.55556C7.22223 7.08968 8.46588 8.33333 10 8.33333C11.5341 8.33333 12.7778 7.08968 12.7778 5.55556Z" fill="#232323"></path>
          </svg>
        </button>
        {#if showDropdown}
          <div class="absolute top-12 right-0 w-48 bg-white bg-opacity-80 shadow-lg rounded-lg z-50">
            <ul class="py-2">
              <button onclick={profile} class="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</button>
              <button onclick="{logout}" class="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</button>
            </ul>
          </div>
        {/if}
      </div>
    </div>
  </div>
</header>

