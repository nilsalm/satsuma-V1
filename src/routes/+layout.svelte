<script>
	import '../app.css';
	import PocketBase from 'pocketbase';

	const pb = new PocketBase('http://127.0.0.1:8090');
	$: loggedIn = pb.authStore.isValid;
</script>

<div class="h-screen px-2 md:px-10 bg-gradient-to-tr to-green-200 from-gray-200">
	{#if loggedIn === true}
		<nav class="p-4">
			<a href="/lists" class="text-xl p-4 m-1 bg-green-300 rounded">📋</a>
			<a href="/profile" class="text-xl p-4 m-1 bg-green-300 rounded">🕺</a>
		</nav>
	{/if}
	<slot />
</div>
