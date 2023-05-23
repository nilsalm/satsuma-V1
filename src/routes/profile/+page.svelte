<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import LayoutContainer from '$lib/components/LayoutContainer.svelte';
	import Title from '$lib/components/Title.svelte';
	import { pb } from '$lib/pocketbase';
	import type { PageData } from './$types';

	export let data: PageData;

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

	<div class="flex-col justify-between flex-wrap gap-2">
		<div class="flex gap-4">
			<div class="font-bold text-xl text-primary">Email:</div>
			<div class="text-lg">
				{data.email}
			</div>
		</div>
		<div class="flex gap-4">
			<div class="font-bold text-xl text-primary">Username:</div>
			<div class="text-lg">
				{data.username}
			</div>
		</div>
	</div>
</LayoutContainer>
