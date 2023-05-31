<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import LayoutContainer from '$lib/components/LayoutContainer.svelte';
	import Title from '$lib/components/Title.svelte';
	import { pb } from '$lib/pocketbase';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
	const logout = () => {
		pb.authStore.clear();
		goto('/');
	};
</script>

<LayoutContainer>
	<div class="flex justify-between w-full mb-4">
		<Title title={'My Profile'} />
		<div class="w-20">
			<Button text="Log out" backgroundColor="secondary" textStyle="small" onClick={logout} />
		</div>
	</div>

	<div class="flex gap-4 my-4">
		<div class="font-bold text-xl text-primary">Email:</div>
		<div class="text-xl">
			{data.email}
		</div>
	</div>

	<form action="?/updateProfile" method="POST">
		<div class="flex gap-4 my-4 items-center">
			<div class="font-bold text-xl text-primary">Username</div>

			<input
				type="text"
				name="username"
				placeholder={data.username || 'Username'}
				value={data.username}
				class="bg-neutral w-full px-4 text-md text-gray-700 border-2 border-gray-700 font-semibold rounded h-12 shadow-sm"
			/>
		</div>

		<input type="hidden" name="id" value={data.id} />

		<Button text="Update Username" />
	</form>
	{#if form?.success}
		<div class="text-green-400 text-center mt-2">Username updated!</div>
	{/if}
	{#if form?.incorrect}
		<div class="text-red-400 text-center mt-2">Something went wrong: {form?.incorrect}</div>
	{/if}
</LayoutContainer>
