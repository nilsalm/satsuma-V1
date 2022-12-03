<script>
	import '../app.css';
	import { getPbClient } from '$lib/usePocketBase';

	const pb = getPbClient();
	$: loggedIn = pb.authStore.isValid;
</script>

<div class="h-screen px-2 md:px-10 bg-gradient-to-tr to-green-200 from-gray-200">
	{#if loggedIn === true}
		<nav class="p-4">
			<a href="/lists" class="text-xl p-4 m-1 bg-green-300 rounded">📋</a>
			<a href="/profile" class="text-xl p-4 m-1 bg-green-300 rounded">🕺</a>
		</nav>
	{:else}
		<nav class="p-4">
			<a href="/login" class="text-xl p-4 m-1 bg-green-300 rounded">Login</a>
			<a href="/signup" class="text-xl p-4 m-1 bg-green-300 rounded">Sign up</a>
		</nav>
	{/if}
	<slot />
</div>
