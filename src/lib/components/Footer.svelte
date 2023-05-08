<script>
	import FooterButton from '$lib/components/FooterButton.svelte';
	import { currentUser } from '$lib/pocketbase';
</script>

{#if $currentUser}
	<div class="w-full h-14 md:h-16 bg-primary fixed bottom-0">
		<div class="max-w-xl h-full mx-auto flex justify-around">
			<FooterButton text="Lists" icon="🗒" href="/lists" />
			<FooterButton text="Categories" icon="🗂" href="/categories" />
			<FooterButton text="Profile" icon="👤" href="/profile" />
		</div>
	</div>
	<div class="h-14 md:h-16 w-full" />
{/if}
