<script>
	import FooterButton from '$lib/components/FooterButton.svelte';
	import { currentUser } from '$lib/pocketbase';
	import { IconType } from '$lib/types/IconType';
	import FooterMainButton from './FooterMainButton.svelte';
</script>

{#if $currentUser}
	<div class="w-full bg-primary fixed bottom-0 h-14">
		<div class="px-1 max-w-md h-full mx-auto flex justify-around gap-2 md:gap-4">
			<FooterButton icon={IconType.List} href="/lists" />
			<FooterButton icon={IconType.Template} href="/templates" />
			<FooterMainButton />
			<FooterButton icon={IconType.Category} href="/categories" />
			<FooterButton icon={IconType.Profile} href="/profile" />
		</div>
	</div>
	<div class="h-14 md:h-16 w-full" />
{/if}
