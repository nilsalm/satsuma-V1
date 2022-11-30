<script>
	import PocketBase from 'pocketbase';

	const pb = new PocketBase('http://127.0.0.1:8090');

	let username = '';
	let password = '';

	$: loggedIn = pb.authStore.isValid;

	async function handleSubmit() {
		const authData = await pb.collection('users').authWithPassword(username, password);
	}
	function handleLogout() {
		pb.authStore.clear();
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
