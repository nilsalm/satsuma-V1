<script>
	import Logo from './Logo.svelte';
</script>

<div class="relative isolate overflow-hidden pt-4 bg-gradient-to-b from-primary to-secondary">
	<div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
		<div class="text-center">
			<div class="inline-flex items-center justify-center">
				<div class="w-60 h-60">
					<Logo />
				</div>
			</div>
			<h1 class="text-4xl mt-6 font-bold tracking-tight text-gray-700 sm:text-6xl">
				Welcome to Satsuma
			</h1>
			<p class="mt-6 text-lg leading-8 text-neutral">
				The shopping list that makes your weekly shopping trip a breeze with categories, templates
				and sharing (coming soon).
			</p>
			<div class="mt-10 flex items-center justify-center gap-x-6">
				<a
					href="/register"
					class="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
					>Get started</a
				>
			</div>
		</div>
	</div>
</div>
