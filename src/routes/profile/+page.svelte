<script lang="ts">
	import { goto } from '$app/navigation';
	import { getPbClient } from '$lib/usePocketBase';
	import MyTitle from '../../components/MyTitle.svelte';

	const pb = getPbClient();

	function handleLogout() {
		pb.authStore.clear();
		goto('/login', { replaceState: true });
	}
</script>

<MyTitle title={'Profile'} />
<!-- TODO the redirect should only happen upon that the authstore is actually cleared -->
<div class="border border-black rounded p-1 w-fit">
	<button on:click={handleLogout}>👋 Log out</button>
</div>
