<script>
	import '../app.css';
	import { getPbClient } from '$lib/usePocketBase';

	const pb = getPbClient();
	$: loggedIn = pb.authStore.isValid;
</script>

<div class="bg-purple mb-4">
	{#if loggedIn === true}
		<nav class="p-4 ">
			<a href="/lists" class="text-xl p-4 m-1 text-light font-semibold  rounded">Lists</a>
			<a href="/profile" class="text-xl p-4 m-1 text-light font-semibold rounded">Profile</a>
		</nav>
	{:else}
		<nav class="p-4">
			<a href="/login" class="text-xl p-4 m-1 text-light font-semibold rounded">Login</a>
			<a href="/signup" class="text-xl p-4 m-1 text-light font-semibold rounded">Sign up</a>
		</nav>
	{/if}
</div>
<div class="h-screen px-2 md:px-10 bg-light">
	<slot />
</div>
