<script>
    function scrollDown() {
      const scrollAmount = window.innerHeight * 0.7;
      window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
  </script>
  
  <section class="relative bg-cover bg-center bg-no-repeat py-64 w-full" style="background-image: url('./hero-bg-unspecified.png')">
    <div class="absolute inset-0 bg-black opacity-20"></div>
    <div class="relative container mx-auto px-4 text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-4 text-white">Welcome to <span class="text-bold text-[#6c63ff]">Shoptify!</span></h1>
      <p class="text-xl text-white mb-8">Discover our amazing products</p>
      <button on:click={scrollDown} class="bg-[#6c63ff] text-white px-6 py-3 rounded-full hover:bg-purple-600 transition duration-200">
        Scroll down!
      </button>
    </div>
  </section>