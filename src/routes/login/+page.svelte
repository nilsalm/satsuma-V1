<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Title from '$lib/components/Title.svelte';
	import { pb } from '$lib/pocketbase';
</script>

<form
	method="POST"
	class="card"
	use:enhance={() => {
		return async ({ result }) => {
			pb.authStore.loadFromCookie(document.cookie);
			await applyAction(result);
		};
	}}
>
	<div class="w-full mb-4">
		<Title title="Log in" />
	</div>

	<div class="flex flex-col gap-4">
		<input
			type="email"
			name="email"
			placeholder="Email"
			class="bg-neutral px-4 text-md text-gray-700 border-2 border-gray-700 font-semibold rounded h-12 shadow-sm"
		/>
		<input
			type="password"
			name="password"
			placeholder="Password"
			class="bg-neutral px-4 text-md text-gray-700 border-2 border-gray-700 font-semibold rounded h-12 shadow-sm"
		/>
		<Button text={'Log in'} backgroundColor={'primary'} />
		<p class="text-center">
			Don't have an account?
			<a href="/register" class="underline">Register now!</a>
		</p>
	</div>
</form>
