<script lang="ts">
	import { applyAction, deserialize, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { PUBLIC_RECAPTCHA_SITE_KEY } from '$env/static/public';
	import Button from '$lib/components/Button.svelte';
	import LayoutContainer from '$lib/components/LayoutContainer.svelte';
	import Title from '$lib/components/Title.svelte';
	import { pb } from '$lib/pocketbase';
	import type { ActionResult } from '@sveltejs/kit';
	import type { ActionData } from './$types';

	export let form: ActionData;
	let token = '';
	$: console.log(token);

	async function handleSubmit(event) {
		doRecaptcha();
		const data = new FormData(this);
		const response = await fetch(this.action, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Recaptcha-Token': token
			},
			body: data
		});

		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			// re-run all `load` functions, following the successful update
			await invalidateAll();
		}

		applyAction(result);
	}

	function doRecaptcha() {
		grecaptcha.ready(function () {
			grecaptcha.execute(PUBLIC_RECAPTCHA_SITE_KEY, { action: 'submit' }).then(function (t) {
				token = t;
			});
		});
	}
</script>

<svelte:head>
	<script
		src="https://www.google.com/recaptcha/api.js?render={PUBLIC_RECAPTCHA_SITE_KEY}"
		async
		defer
	></script>
</svelte:head>

<LayoutContainer>
	<div class="w-full mb-4">
		<Title title="Log in" />
	</div>

	<form
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				pb.authStore.loadFromCookie(document.cookie);
				await applyAction(result);
			};
		}}
		on:submit|preventDefault={handleSubmit}
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
