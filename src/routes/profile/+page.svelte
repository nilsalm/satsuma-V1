<script lang="ts">
	import PocketBase from 'pocketbase';

	const pb = new PocketBase('http://127.0.0.1:8090');

	function handleLogout() {
		pb.authStore.clear();
	}
</script>

<a href="/login" class="underline" on:click={handleLogout}>Log out</a>
