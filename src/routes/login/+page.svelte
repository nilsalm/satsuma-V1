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
	<Title title="Log in" />

	<div class="gap-2 mb-4">
		<input type="email" name="email" placeholder="Email" class=" text-black" />
		<input
			type="password"
			name="password"
			placeholder="Password"
			class="input input-bordered text-black"
		/>
		<Button text={'Log in'} backgroundColor={'primary'} />
	</div>
	<p class="text-center">
		Don't have an account?
		<a href="/register" class="underline">Create one now!</a>
	</p>
</form>
