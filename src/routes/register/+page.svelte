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
	<Title title="Register new account" />

	<div class="form-control gap-2 mb-4">
		<input type="email" name="email" placeholder="Email" class="input input-bordered text-black" />
		<input
			type="password"
			name="password"
			placeholder="Password"
			class="input input-bordered text-black"
		/>
		<input
			type="password"
			name="passwordConfirm"
			placeholder="Confirm Password"
			class="input input-bordered text-black"
		/>
		<Button text="Register" />
	</div>
	<p class="text-center">
		Already have an account?
		<a href="/login" class="underline">Sign in!</a>
	</p>
</form>
