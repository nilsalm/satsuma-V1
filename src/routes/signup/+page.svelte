<script lang="ts">
	import { goto } from '$app/navigation';
	import { type newUserData, createUser } from '$lib/usePocketBase';
	import MyTitle from '../../components/MyTitle.svelte';

	let username = '';
	let email = '';
	let password = '';
	let passwordConfirm = '';

	async function handleSubmit() {
		if (password != passwordConfirm) return;

		const data: newUserData = {
			username: username,
			email: email,
			password: password
		};

		const record = await createUser(data);
		if (record) {
			username = '';
			email = '';
			password = '';
			passwordConfirm = '';
			goto('/login', { replaceState: true });
		} else {
			console.log('Error creating user');
		}
	}
</script>

<MyTitle title={'Create an account'} />
<div class="flex flex-col mt-8">
	<p class="font-semibold pl-2 mt-4">Username</p>
	<input
		class="border rounded-md m-2 p-1 md:w-1/3 md:mx-auto"
		bind:value={username}
		type="text"
		name="username"
		placeholder="Username"
	/>
	<p class="font-semibold pl-2 mt-4">Email</p>
	<input
		class="border rounded-md m-2 p-1 md:w-1/3 md:mx-auto"
		bind:value={email}
		type="text"
		name="email"
		placeholder="Email"
	/>
	<p class="font-semibold pl-2 mt-4">Password</p>
	<input
		class="border rounded-md m-2 p-1 md:w-1/3 md:mx-auto"
		bind:value={password}
		type="password"
		name="password"
		placeholder="Password (> 8 characters)"
	/>
	<p class="font-semibold pl-2 mt-4">Confirm Password</p>
	<input
		class="border rounded-md m-2 p-1 md:w-1/3 md:mx-auto"
		bind:value={passwordConfirm}
		type="password"
		name="passwordConfirm"
		placeholder="Confirm Password"
	/>

	<button
		class="border rounded-md border-black bg-purple disabled:bg-pink disabled:text-light text-light font-semibold text-lg m-2 p-1 mt-8 md:w-1/3 md:mx-auto"
		type="submit"
		disabled={username.length < 3 ||
			email.length < 3 ||
			password.length < 8 ||
			passwordConfirm.length < 8}
		on:click={handleSubmit}>Start shopping smarter</button
	>
	<a class="underline mx-auto mt-4" href="/login">I already have an account</a>
</div>
