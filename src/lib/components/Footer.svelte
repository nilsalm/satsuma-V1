<script>
	import FooterButton from '$lib/components/FooterButton.svelte';
	import { currentUser } from '$lib/pocketbase';
	import FooterMainButton from './FooterMainButton.svelte';

	import dummyIcon from '$lib/assets/dummy-icon.svg';
</script>

{#if $currentUser}
	<div class="w-full bg-primary fixed bottom-0 h-16">
		<div class="px-1 max-w-xl h-full mx-auto flex justify-around gap-2 md:gap-4">
			<FooterButton icon="{dummyIcon}" href="/profile" />
			<FooterButton icon="{dummyIcon}" href="/categories" />
			<FooterButton icon="{dummyIcon}" href="/lists" />
			<FooterButton icon="{dummyIcon}" href="/templates" />
			<FooterMainButton />
		</div>
	</div>
	<div class="h-14 md:h-16 w-full" />
{/if}
