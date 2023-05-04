<script>
	import '../app.postcss';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="h-screen w-screen">
	<Navbar />

	<slot />

	<Footer />
</div>
