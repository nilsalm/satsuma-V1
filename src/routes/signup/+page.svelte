<script>
	import PocketBase from 'pocketbase';

	const pb = new PocketBase('http://127.0.0.1:8090');

	let username = '';
	let email = '';
	let password = '';
	let passwordConfirm = '';

	$: loggedIn = pb.authStore.isValid;

	async function handleSubmit() {
		const data = {
			username: username,
			email: email,
			password: password,
			passwordConfirm: passwordConfirm
		};

		console.log(data);
		const record = await pb.collection('users').create(data);
		console.log(record);

		username = '';
		email = '';
		password = '';
		passwordConfirm = '';
	}
</script>

{#if loggedIn === true}
	<div class="text-xl">Welcome to Satsuma</div>
{:else}
	<div>Create an account</div>
	<div class="flex flex-col mt-8">
		<input
			class="border rounded-lg m-2 p-1 w-1/3"
			bind:value={username}
			type="text"
			name="username"
			placeholder="Username"
		/>
		<input
			class="border rounded-lg m-2 p-1 w-1/3"
			bind:value={email}
			type="text"
			name="email"
			placeholder="Email"
		/>
		<input
			class="border rounded-lg m-2 p-1 w-1/3"
			bind:value={password}
			type="password"
			name="password"
			placeholder="Password"
		/>
		<input
			class="border rounded-lg m-2 p-1 w-1/3"
			bind:value={passwordConfirm}
			type="password"
			name="passwordConfirm"
			placeholder="Confirm Password"
		/>

		<button
			class="border rounded-lg border-black bg-green-400 text-xl p-4 mt-8"
			type="submit"
			on:click={handleSubmit}>Start shopping smarter</button
		>
	</div>
{/if}
