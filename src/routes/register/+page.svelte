<script>
  import { enhance } from "$app/forms";
  import { toast } from "svelte-5-french-toast";
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100 w-full">
  <div class="bg-white p-8 rounded-lg shadow-lg w-96">
    <h1 class="text-2xl font-bold mb-4">Register</h1>
    <p class="mb-6">Daftar untuk memulai petualangan Anda!</p>
    <form use:enhance method="post">
      <div class="mb-4">
        <input type="text" name="username" placeholder="Username" class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500" required>
      </div>
      <div class="mb-4 relative">
        <input type="password" name="password" placeholder="Kata Sandi" class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500" required>
      </div>
      <button type="submit" class="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition duration-200">Register!</button>
    </form>
  </div>
</div>
