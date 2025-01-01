<script lang="ts">
    export let isOpen = false;
    // export let user: any;

    let temporaryUser = {
      name: 'John Doe',
      username: 'johndoe'
    };
  
    function closeModal() {
      isOpen = false;
    }
  </script>
  
  {#if isOpen}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Hello, {temporaryUser.name}!</h2>
        <p class="text-gray-600">Your username is {temporaryUser.username}</p>
        <button class="bg-[#6c63ff] text-white px-4 py-2 rounded-full mt-3 hover:bg-purple-600 transition duration-300 w-full" on:click={closeModal}>   
          Close
        </button>
        <!-- Button logout ? -->
         <button class="bg-[#6c63ff] text-white px-4 py-2 rounded-full mt-3 hover:bg-purple-600 transition duration-300 w-full" on:click={closeModal}>   
          Logout ?
        </button>
      </div>
    </div>
  {/if}
  
  