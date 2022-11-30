<script>
	import PocketBase from 'pocketbase';

	const pb = new PocketBase('http://127.0.0.1:8090');

	let email = '';
	let password = '';

	$: loggedIn = pb.authStore.isValid;

	async function handleSubmit() {
		const authData = await pb.collection('users').authWithPassword(email, password);
	}
</script>

{#if loggedIn === true}
	<div class="text-xl">Welcome</div>
{:else}
	<div class="text-xl">Login</div>
	<div class="flex flex-col mt-8">
		<input
			class="border rounded-lg m-2 p-1 md:w-1/3 md:mx-auto"
			bind:value={email}
			type="text"
			name="email"
			placeholder="Email"
		/>
		<input
			class="border rounded-lg m-2 p-1 md:w-1/3 md:mx-auto"
			bind:value={password}
			type="password"
			name="password"
			placeholder="Password"
		/>
		<button
			class="border rounded-lg border-black bg-green-400 disabled:bg-gray-200 disabled:text-gray-400 text-xl p-4 mt-8 md:w-1/3 md:mx-auto"
			type="submit"
			disabled={email.length === 0 || password.length === 0}
			on:click={handleSubmit}>Login</button
		>
		<a class="underline mx-auto mt-4" href="/signup">Create new account</a>
	</div>
{/if}
