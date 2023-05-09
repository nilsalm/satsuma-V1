<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="max-w-xl mx-auto py-8 px-4">
	<div class="mb-4 w-full">
		<Title title={'My Profile'} />
	</div>

	<div class="flex justify-between flex-wrap gap-2">
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
</div>
