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
		<Title title="Log in" />
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
				name="usernameOrEmail"
				placeholder="Username or Email"
				class="bg-neutral px-4 text-md text-gray-700 border-2 border-gray-700 font-semibold rounded h-12 shadow-sm"
				class:bg-red-100={form?.incorrect}
			/>
			<input
				type="password"
				name="password"
				placeholder="Password"
				class="bg-neutral px-4 text-md text-gray-700 border-2 border-gray-700 font-semibold rounded h-12 shadow-sm"
				class:bg-red-100={form?.incorrect}
			/>

			<Button text={'Log in'} backgroundColor={'primary'} />

			{#if form?.incorrect}
				<p class="text-center text-red-500">Invalid credentials</p>
			{/if}

			<p class="text-center">
				Don't have an account?
				<a href="/register" class="underline">Register now!</a>
			</p>
			<p class="text-center text-sm">
				Forgot your password?
				<a href="/password-reset" class="underline">Reset it</a>
			</p>
		</div>
	</form>
</LayoutContainer>
