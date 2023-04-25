<script lang="ts">
	import { enhance } from '$app/forms';
	import Item from '$lib/components/Item.svelte';
	import Title from '$lib/components/Title.svelte';
	import type { PageData } from './$types';
	import { pb } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';

	export let data: PageData;

	// STATE
	let newItemCategoryId = '';
	let newCategoryName = '';
	let showNewCategoryModal = false;
	let newItemName = '';

	$: proposeCategory(newItemName);

	function setNewItemCategoryId(id: string) {
		newItemCategoryId = id;
	}

	async function proposeCategory(itemName: string) {
		if (itemName.length < 3) return;

		let resultList;

		try {
			resultList = (await pb.collection('items').getList(1, 50, {
				filter: `name ~ "${itemName}"`
			})) as {
				page: number;
				perPage: number;
				totalItems: number;
				totalPages: number;
				items: Array<{
					name: string;
					category: string;
				}>;
			};
		} catch (ClientResponseError) {
			return;
		}

		if (resultList.items.length === 0) return;

		const item = resultList.items.reverse()[0];
		const catId = item.category;
		newItemCategoryId = catId;
	}

	function editList() {
		goto(`/lists/${data.list.id}/edit`);
	}
</script>

<div class="flex justify-between w-full mb-4">
	<div class="flex items-start">
		<Title title={data.list.name} />
		{#if data.list.isTemplate}
			<p class="mt-2 ml-3">Template</p>
		{/if}
	</div>

	<div class="w-1/6">
		<Button text="Edit list" backgroundColor="secondary" textStyle="small" onClick={editList} />
	</div>
</div>

<div class="flex flex-col max-h-screen h-[650px]">
	<div class=" flex flex-col pb-4 flex-grow overflow-y-scroll">
		<div>
			{#if data.items.length === 0}
				<div class="text-center mt-20">
					<p>Good job!</p>
					<p>Now get yourself some ice cream 🍦</p>
				</div>
			{:else}
				{#each data.categories as cat}
					{#if data.items.filter((i) => i.category === cat.id).length > 0}
						<div class="text-lg mt-8 border-primary border-b-4 text-primary font-semibold">
							<p>{cat.name}</p>
						</div>
						{#each data.items.filter((i) => i.category === cat.id) as item}
							<Item {item} />
						{/each}
					{/if}
				{/each}
			{/if}
		</div>
	</div>

	<div class="mb-4 rounded shadow-lg bg-secondary p-1">
		<!-- CATEGORY PICKER -->
		<div class="flex overflow-x-scroll my-2 h-12 p-2 bg-secondary gap-1">
			{#each data.categories as cat}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					on:click={() => setNewItemCategoryId(cat.id)}
					class="p-1 bg-neutral rounded-lg text-gray-700 text-sm text-center {cat.id ===
					newItemCategoryId
						? 'border-2 border-primary'
						: 'border-2 border-neutral'}"
				>
					{cat.name}
				</div>
			{/each}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			{#if showNewCategoryModal === false}
				<div
					on:click={() => {
						showNewCategoryModal = true;
					}}
					class="py-1 rounded-lg text-gray-700 text-xs text-center bg-accent cursor-pointer"
				>
					<div class="text-sm px-2">+</div>
				</div>
			{:else}
				<form action="?/createCategory" method="POST" use:enhance>
					<div class="flex flex-row px-1 gap-1">
						<input
							class="w-28 text-gray-700 text-xs bg-neutral border-0 rounded-md"
							bind:value={newCategoryName}
							name="name"
							type="text"
						/>
						<button
							class="rounded px-3 bg-primary disabled:opacity-70 disabled:text-gray-300 text-gray-700"
							disabled={newCategoryName.length === 0}
						>
							Add
						</button>
					</div>
				</form>
			{/if}
		</div>

		<!-- CREATE ITEM -->
		<div class="flex">
			<div class="flex-grow">
				<form action="?/createItem" method="POST" use:enhance>
					<div class="w-full flex items-start gap-2 align-bottom">
						<input
							class="bg-neutral w-full px-4 text-md text-gray-700 border-2 border-gray-700 font-semibold rounded h-12 shadow-sm"
							type="text"
							name="name"
							bind:value={newItemName}
						/>
						<div class="w-20">
							<Button text="Add" />
						</div>
					</div>

					<input type="hidden" name="category" value={newItemCategoryId} />
					<input type="hidden" name="list" value={data.list.id} />
				</form>
			</div>
		</div>

		<!-- TEMPLATE PICKER -->
		{#if data.templates.length > 0 && data.list.isTemplate === false}
			<div class="flex flex-row overflow-x-scroll m-2">
				{#each data.templates as template}
					<form action="?/addTemplateItemsToList" method="POST" use:enhance>
						<button class="p-1 rounded-lg mr-1 text-gray-700 h-6 text-xs text-center bg-accent">
							{template.name || `Template ${template.id.substring(0, 3)}`}
						</button>
						<input type="hidden" name="template" value={template.id} />
						<input type="hidden" name="list" value={data.list.id} />
					</form>
				{/each}
			</div>
		{/if}
	</div>
</div>
