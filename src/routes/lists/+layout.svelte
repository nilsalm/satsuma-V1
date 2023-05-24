<script>
	import { page } from '$app/stores';

	import LayoutContainer from '$lib/components/LayoutContainer.svelte';

	let isListIdPage = false;

	$: isListIdPage = $page.route.id === '/lists/[listId]';
</script>

<LayoutContainer withPadding={!isListIdPage}>
	<slot />
</LayoutContainer>
