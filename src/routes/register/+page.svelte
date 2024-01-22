<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import LayoutContainer from '$lib/components/LayoutContainer.svelte';
	import Title from '$lib/components/Title.svelte';
	import { pb } from '$lib/pocketbase';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<LayoutContainer>
	<div class="w-full mb-4">
		<Title title="Register new account" />
	</div>

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
		<div class="flex flex-col gap-4">
			<input
				type="text"
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
			<input
				type="password"
				name="passwordConfirm"
				placeholder="Confirm Password"
				class="bg-neutral px-4 text-md text-gray-700 border-2 border-gray-700 font-semibold rounded h-12 shadow-sm"
			/>

			<Button text="Register" />

			{#if form?.incorrect}
				<p class="text-center text-red-500">We had trouble creating your account.</p>
			{:else if form?.passwordMatchError}
				<p class="text-center text-red-500">Passwords don't match.</p>
			{/if}
			<p class="text-center">
				Already have an account?
				<a href="/login" class="underline">Log in!</a>
			</p>
		</div>
	</form>
</LayoutContainer>
