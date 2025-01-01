<script>
    export let name;
    export let price;
    export let imageUrl;
  </script>
  
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={imageUrl} alt={name} class="w-full h-64 object-cover" />
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-2">{name}</h3>
      <p class="text-gray-600">${price}</p>
      <button class="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
        Add to Cart
      </button>
    </div>
  </div>