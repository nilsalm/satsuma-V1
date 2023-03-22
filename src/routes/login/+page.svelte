<script>
	import { goto } from '$app/navigation';
	import { getPbClient } from '$lib/usePocketBase';
	import MyTitle from '../../components/MyTitle.svelte';

	const pb = getPbClient();

	let email = '';
	let password = '';

	async function handleSubmit() {
		const authData = await pb.collection('users').authWithPassword(email, password);
		console.log(authData);
		if (pb.authStore.isValid === true) {
			goto('/lists', { replaceState: true });
		} else {
			console.log('Error logging in');
		}
	}
</script>

<MyTitle title={'Sign in to Satsuma'} />
<div class="flex flex-col mt-8">
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
		placeholder="Password"
	/>
	<button
		class="border rounded-md border-black bg-purple disabled:bg-pink disabled:text-light text-light font-semibold text-lg m-2 p-1 mt-8 md:w-1/3 md:mx-auto"
		type="submit"
		disabled={email.length === 0 || password.length === 0}
		on:click={handleSubmit}>Login</button
	>
	<a class="underline mx-auto mt-4" href="/signup">Create new account</a>
</div>
