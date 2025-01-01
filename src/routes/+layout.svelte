<script lang="ts">
  import { i18n } from '$lib';
  import { ParaglideJS } from '@inlang/paraglide-sveltekit';
  import { Toaster } from 'svelte-5-french-toast';
  import '../app.css';
  import Header from '../components/header.svelte';
  import Footer from '../components/footer.svelte';

  let { children } = $props();
</script>

<ParaglideJS {i18n}>
  <Header />
  <Toaster position="top-center" />
  <main class="flex flex-col items-center justify-center min-h-screen w-full bg-slate-400">
    <div class="w-full">
      {@render children()}
    </div>
  </main>
  <Footer />
</ParaglideJS>