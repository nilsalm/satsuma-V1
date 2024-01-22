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
		<Title title="Password reset" />
	</div>

	<form
		method="POST"
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
				class:bg-red-100={form?.incorrect}
			/>
      
      <Button text={'Send reset email'} backgroundColor={'primary'} />

			{#if form?.incorrect}
				<p class="text-center text-lg text-red-500">Could not reset</p>
			{/if}

			{#if form?.success}
				<p class="text-center text-lg text-green-400 ">
					Email sent to <strong> {form.email} </strong>
				</p>
			{/if}

			<p class="text-center">
				Back to
				<a href="/login" class="underline">login</a>
			</p>
		</div>
	</form>
</LayoutContainer>
