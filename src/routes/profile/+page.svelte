<script lang="ts">
	import { getPbClient } from '$lib/usePocketBase';

	const pb = getPbClient();

	function handleLogout() {
		pb.authStore.clear();
	}
</script>

<!-- TODO should be a button  -->
<!-- TODO the redirect should only happen upon that the authstore is actually cleared -->
<a href="/login" class="underline" on:click={handleLogout}>Log out</a>
