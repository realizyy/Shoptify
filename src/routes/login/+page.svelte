<script>
  import { enhance } from "$app/forms";
  import { toast } from "svelte-5-french-toast";
  import { onMount } from 'svelte';

  function testToast() {
    toast("Hello, World!");
  }
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100 w-full">
  <div class="flex flex-col md:flex-row items-center justify-center space-y-5 md:space-y-0 md:space-x-10">
    <div class="max-w-xl w-full">
      <img src="./undraw_remotely_2j6y.svg" alt="Illustration" class="w-full h-auto object-cover object-center rounded-lg">
    </div>
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-4">Selamat Datang Kembali!</h1>
      <p class="text-center mb-6">Masuk untuk melanjutkan belanja anda di <span class="font-bold text-[#6c63ff]">Shoptify</span></p>
      <form use:enhance method="post">
        <div class="mb-4">
          <input type="text" name="username" placeholder="Username" class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6c63ff]" required>
        </div>
        <div class="mb-4 relative">
          <input type="password" name="password" placeholder="Kata Sandi" class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6c63ff]" required>
        </div>
        <button type="submit" class="w-full bg-[#6c63ff] text-white p-3 rounded hover:bg-purple-600 transition duration-200">Login</button>
      </form>
      <form method="post">
        <button type="submit" class="w-full p-3 mt-2 rounded bg-gray-200 hover:bg-gray-300 transition duration-200">Login as Guest</button>
      </form>
      <a href="/register" class="block text-center mt-4 text-[#6c63ff] hover:underline">Belum punya akun? Daftar sekarang!</a>
      <button on:click={testToast} class="w-full p-3 mt-2 rounded bg-gray-200 hover:bg-gray-300 transition duration-200">Test Toast</button>
    </div>
  </div>
</div>

<!-- 
<script lang="ts">
  import { toast } from 'svelte-5-french-toast';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let username = '';
  let password = '';

  const handleLogin = async () => {
  console.log('Attempting to log in...');
  const response = await fetch('/login', {
    method: 'POST',
    body: new URLSearchParams({ username, password })
  });
  const result = await response.json();

  console.log('Login response:', result);

  if (result.success) {
    goto('/'); // Redirect jika login berhasil
  } else {
    console.log('Login failed, showing toast error');
    toast.error(result.message); // Tampilkan toast error jika login gagal
  }
};
</script>

<form on:submit|preventDefault={handleLogin}>
  <input type="text" bind:value={username} placeholder="Username" required />
  <input type="password" bind:value={password} placeholder="Password" required />
  <button type="submit">Login</button>
</form> -->