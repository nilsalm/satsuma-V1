<script lang="ts">
	import { enhance } from '$app/forms';
	import Item from '$lib/components/Item.svelte';
	import Title from '$lib/components/Title.svelte';
	import type { ActionData, PageData } from './$types';
	import { pb } from '$lib/pocketbase';
	import Button from '$lib/components/Button.svelte';

	export let data: PageData;
	export let form: ActionData;

	// STATE
	let newItemCategoryId = '';
	let newCategoryName = '';
	let showNewCategoryModal = false;
	let newItemName = '';

	$: if (form?.success && form?.action === 'createCategory') {
		setNewItemCategoryId(form?.id);
	}

	$: proposeCategory(newItemName);

	function setNewItemCategoryId(id: string) {
		if (id === newItemCategoryId) {
			newItemCategoryId = '';
			return;
		}
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
</script>

<div class="flex justify-between w-full mb-1 px-4">
	<div class="flex items-start">
		<Title title={data.list.name} />
		{#if data.list.isTemplate}
			<div class="flex justify-center ml-4 h-full items-center">
				<div class="bg-accent text-md text-gray-600 font-medium pb-1 px-2 rounded-lg">Template</div>
			</div>
		{/if}
	</div>

	<a href={`/lists/${data.list.id}/edit`} class="w-20">
		<Button text="Edit list" backgroundColor="secondary" textStyle="small" />
	</a>
</div>

<div class="fixed w-screen max-w-xl bottom-0">
	<div class="bg-gradient-to-b from-white to-secondary h-2 sm:h-0" />
	<div class="sm:rounded sm:mb-2 sm:shadow-lg bg-secondary px-2">
		<!-- CATEGORY PICKER -->
		<div class="flex overflow-x-scroll h-11 p-2 first:pl-0 gap-1">
			{#each data.categories as cat}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					on:click={() => setNewItemCategoryId(cat.id)}
					class="p-1 rounded h-full text-sm cursor-pointer shadow text-center {cat.id ===
					newItemCategoryId
						? 'bg-primary text-neutral'
						: 'bg-neutral text-gray-700'}"
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
					class="py-1 rounded text-gray-500 font-bold text-xs text-center bg-accent shadow cursor-pointer"
				>
					<div class="text-sm px-2">+</div>
				</div>
			{:else}
				<form action="?/createCategory" method="POST" use:enhance>
					<div class="flex flex-row h-full gap-1">
						<input
							class="w-28 text-gray-700 text-xs bg-neutral border-0 rounded"
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
			<div class="flex overflow-x-scroll h-11 py-2 first:pl-0 gap-1">
				{#each data.templates as template}
					<form action="?/addTemplateItemsToList" method="POST" use:enhance>
						<button class="p-1 rounded text-gray-700 h-full text-xs text-center bg-accent">
							{template.name || `Template ${template.id.substring(0, 3)}`}
						</button>
						<input type="hidden" name="template" value={template.id} />
						<input type="hidden" name="list" value={data.list.id} />
					</form>
				{/each}
			</div>
		{:else}
			<div class="h-2" />
		{/if}
	</div>
</div>

<div class="flex flex-col pb-4 overscroll-contain px-4 mb-[130px]">
	<div>
		{#if data.items.length === 0}
			<div class="text-center mt-20">
				<p>Good job!</p>
				<p>Now get yourself some ice cream 🍦</p>
			</div>
		{:else}
			{#each data.categories as cat}
				{#if data.items.filter((i) => i.category === cat.id).length > 0}
					<div class="text-lg mt-6 first:mt-2 border-primary border-b-4 text-primary font-semibold">
						<p>{cat.name}</p>
					</div>
					{#each data.items.filter((i) => i.category === cat.id) as item}
						<Item {item} />
					{/each}
				{/if}
			{/each}
			{#if data.items.filter((i) => i.category === null).length > 0}
				<div class="text-lg mt-6 first:mt-2 border-primary border-b-4 text-primary font-semibold">
					<p>Other</p>
				</div>
				{#each data.items.filter((i) => i.category === null) as item}
					<Item {item} />
				{/each}
			{/if}
		{/if}
	</div>
</div>
