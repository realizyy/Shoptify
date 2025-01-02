<script>
  import { enhance } from "$app/forms";
  import { toast } from "svelte-5-french-toast";
  import { onMount } from 'svelte';
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
      <a href="/register" class="block text-center mt-4 text-[#6c63ff] hover:underline">Belum punya akun? Daftar sekarang!</a>
    </div>
  </div>
</div>