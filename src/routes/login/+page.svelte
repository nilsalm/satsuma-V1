<script>
	import PocketBase from 'pocketbase';

	const client = new PocketBase('http://127.0.0.1:8090');

	let username = '';
	let password = '';

	$: loggedIn = client.authStore.isValid;

	async function handleSubmit() {
		const userData = await client.users.authViaEmail(username, password);
	}
	function handleLogout() {
		client.authStore.clear();
	}
</script>

<p>Login Logout logic</p>

{#if loggedIn === true}
	<div class="text-xl">Welcome</div>
	<div on:click={handleLogout}>Log out</div>
{:else}
	<div>Login</div>

	<input bind:value={username} type="text" name="username" placeholder="Username" />
	<br />
	<input bind:value={password} type="password" name="password" placeholder="Password" />
	<br />
	<button type="submit" on:click={handleSubmit}>Login</button>
{/if}
