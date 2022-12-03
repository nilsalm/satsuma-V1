<script>
	import { goto } from '$app/navigation';
	import { getPbClient } from '$lib/usePocketBase';

	const pb = getPbClient();
	let username = '';
	let email = '';
	let password = '';
	let passwordConfirm = '';

	async function handleSubmit() {
		if (password != passwordConfirm) return;

		const data = {
			username: username,
			email: email,
			password: password,
			passwordConfirm: passwordConfirm
		};

		const record = await pb.collection('users').create(data);
		if (record) {
			username = '';
			email = '';
			password = '';
			passwordConfirm = '';
			goto('/login', { replaceState: true });
		}
	}
</script>

<div>Create an account</div>
<div class="flex flex-col mt-8">
	<input
		class="border rounded-lg m-2 p-1 md:w-1/3 md:mx-auto"
		bind:value={username}
		type="text"
		name="username"
		placeholder="Username"
	/>
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
		placeholder="Password (> 8 characters)"
	/>
	<input
		class="border rounded-lg m-2 p-1 md:w-1/3 md:mx-auto"
		bind:value={passwordConfirm}
		type="password"
		name="passwordConfirm"
		placeholder="Confirm Password"
	/>

	<button
		class="border rounded-lg border-black bg-green-400 disabled:bg-gray-200 disabled:text-gray-400 text-xl p-4 mt-8 md:w-1/3 md:mx-auto"
		type="submit"
		disabled={username.length < 3 ||
			email.length < 3 ||
			password.length < 8 ||
			passwordConfirm.length < 8}
		on:click={handleSubmit}>Start shopping smarter</button
	>
	<a class="underline mx-auto mt-4" href="/login">I already have an account</a>
</div>
