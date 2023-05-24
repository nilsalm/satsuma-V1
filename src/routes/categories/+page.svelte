<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Title from '$lib/components/Title.svelte';
	import type { PageData } from './$types';
	import CategoryItem from '$lib/components/CategoryItem.svelte';
	import { pb } from '$lib/pocketbase';
	import LayoutContainer from '$lib/components/LayoutContainer.svelte';

	export let data: PageData;

	let { categories } = data;
	let hoverIndex: number | null = null;
	let draggingItem: number | null = null;

	function dragStart(event: any, itemIndex: any) {
		draggingItem = itemIndex;
		event.dataTransfer.setData('itemIndex', itemIndex);
	}

	function drop(event: any) {
		event.preventDefault();
		const oldItemIndex = event.dataTransfer.getData('itemIndex');
		const [item] = categories.splice(oldItemIndex, 1);
		categories.splice(hoverIndex!, 0, item);
		for (let i = 0; i < categories.length; i++) {
			categories[i].order = i;
			pb.collection('categories').update(categories[i].id, { order: i });
		}
		categories = categories;
		hoverIndex = null;
		draggingItem = null;
	}
</script>

<div class="mt-4 md:mt-8 mb-4 w-full">
	<Title title={'My Categories'} />
</div>
<div class="w-full mt-4 flex flex-col items-center">
	{#if data.categories.length === 0}
		<div class="text-gray-500 text-center">You don't have any categories yet.</div>
	{:else}
		<div class="flex flex-col justify-center w-full gap-3">
			{#each categories as category, index}
				<div
					on:drop={(event) => drop(event)}
					on:dragstart={(event) => dragStart(event, index)}
					on:dragenter={() => (hoverIndex = index)}
					on:dragleave={() => (hoverIndex = null)}
					on:dragover={(event) => event.preventDefault()}
					class={hoverIndex === index ? 'border-t-4 rounded-lg border-primary' : ''}
				>
					<CategoryItem {category} dragging={index === draggingItem} />
				</div>
			{/each}
		</div>
	{/if}
</div>
