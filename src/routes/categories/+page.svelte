<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import type { PageData } from './$types';
	import CategoryItem from '$lib/components/CategoryItem.svelte';

	export let data: PageData;
</script>

<div class="max-w-xl mx-auto pb-8 px-4">
	<div class="mt-4 md:mt-8 mb-4 w-full">
		<Title title={'My Categories'} />
	</div>

	<div class="w-full mt-4 flex flex-col items-center">
		{#if data.categories.length === 0}
			<div class="text-gray-500 text-center">You don't have any categories yet.</div>
		{:else}
			<div class="flex flex-col justify-center w-full gap-3">
				{#each data.categories as category}
					<CategoryItem {category} />
				{/each}
			</div>
		{/if}
	</div>
</div>
