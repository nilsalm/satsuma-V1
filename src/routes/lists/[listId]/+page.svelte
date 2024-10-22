<script lang="ts">
	import { fade } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import Item from '$lib/components/Item.svelte';
	import Title from '$lib/components/Title.svelte';
	import type { ActionData, PageData } from './$types';
	import { pb } from '$lib/pocketbase';
	import Button from '$lib/components/Button.svelte';
	import { isPlanModeActive } from '$lib/stores/mode';
	import { page } from '$app/stores';
	import { currentUser } from '$lib/pocketbase';
	import Icon from '$lib/components/Icon.svelte';
	import { IconType } from '$lib/types/IconType';
	import { colors } from '$lib/util';

	export let data: PageData;
	export let form: ActionData;

	const user = $currentUser;

	// STATE
	let newItemCategoryId = '';
	let newCategoryName = '';
	let showNewCategoryModal = false;
	let newItemName = '';
	let showPicked = false;

	$: showPicked = $page.url.searchParams.get('showPicked') === 'true' || false;
	$: items = data.items.filter((i) => i.picked === showPicked);

	$: if (form?.success && form?.action === 'createCategory') {
		setNewItemCategoryId(form?.id);
	}

	$: proposeCategory(newItemName);

	function refreshItem(event) {
		const { item } = event.detail;
		const index = items.findIndex((i) => i.id === item.id);
		items[index] = item;
		items = items;
	}

	function setNewItemCategoryId(id: string) {
		if (id === newItemCategoryId) {
			newItemCategoryId = '';
			return;
		}
		newItemCategoryId = id;
	}

	async function proposeCategory(itemName: string) {
		if (itemName.length < 3) return;

		const nameMatch = itemName.match(/^(\d+)\s+(.*)$/);
		if (nameMatch) {
			itemName = nameMatch[2];
		}

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

	<div class="flex gap-2">
		<div class="w-20">
			<a href={`/lists/${data.list.id}?showPicked=${!showPicked}`} class="w-20">
				<Button
					text={showPicked ? 'Planned' : 'Picked'}
					backgroundColor="secondary"
					textStyle="small"
				/>
			</a>
		</div>
		<a href={`/lists/${data.list.id}/edit`} class="w-20">
			<Button text="Edit list" backgroundColor="secondary" textStyle="small" />
		</a>
	</div>
</div>

<div class="pb-4 overscroll-contain px-4 mb-40">
	{#if items.length === 0}
		<div class="text-center mt-20">
			<p>Good job!</p>
			<p>Now get yourself some ice cream 🍦</p>
		</div>
	{:else}
		{#each data.categories as cat}
			{#if items.filter((i) => i.category === cat.id).length > 0}
				<div class="text-lg mt-6 first:mt-2 border-primary border-b-4 text-primary font-semibold">
					<p>{cat.name}</p>
				</div>
				{#each items.filter((i) => i.category === cat.id) as item}
					<div in:fade>
						<Item on:updated={refreshItem} {item} newCategoryId={newItemCategoryId} />
					</div>
				{/each}
			{/if}
		{/each}
		{#if items.filter((i) => i.category === null).length > 0}
			<div class="text-lg mt-6 first:mt-2 border-primary border-b-4 text-primary font-semibold">
				<p>Other</p>
			</div>
			{#each items.filter((i) => i.category === null) as item}
				<div in:fade>
					<Item on:updated={refreshItem} {item} newCategoryId={newItemCategoryId} />
				</div>
			{/each}
		{/if}
	{/if}
</div>

{#if $isPlanModeActive}
	<div class="fixed w-screen max-w-xl bottom-14 md:bottom-20 flex flex-col">
		<!-- CATEGORY PICKER -->
		<div class="rounded shadow-lg bg-secondary p-2">
			<div class="flex overflow-x-scroll h-12 pb-2 first:pl-0 gap-1">
				{#each data.categories as cat}
					<div
						class="px-2 md:px-3 rounded h-full relative cursor-pointer shadow {cat.id ===
						newItemCategoryId
							? 'bg-primary text-neutral'
							: 'bg-neutral text-gray-700'}"
					>
						<button
							on:click={() => setNewItemCategoryId(cat.id)}
							class="h-full text-md md:text-lg text-center"
						>
							{cat.name}
						</button>
						<div class="absolute top-0 right-0" hidden={user.id === cat?.owner}>
							<Icon type={IconType.Shared} size="15" stroke={colors.darker} />
						</div>
					</div>
				{/each}
				{#if showNewCategoryModal === false}
					<button
						on:click={() => {
							showNewCategoryModal = true;
						}}
						class="py-1 rounded text-gray-500 font-bold text-xs text-center bg-accent shadow cursor-pointer"
					>
						<div class="text-sm px-3">+</div>
					</button>
				{:else}
					<form action="?/createCategory" method="POST" use:enhance>
						<div class="flex flex-row gap-1">
							<input
								class="w-28 text-gray-700 text-xs bg-neutral border-0 rounded"
								bind:value={newCategoryName}
								name="name"
								type="text"
								placeholder="New shopping item"
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
			<form action="?/createItem" method="POST" use:enhance>
				<div class="w-full flex items-start gap-2 align-bottom">
					<input
						class="bg-neutral w-full px-4 text-md text-gray-700 border-2 border-gray-700 font-semibold rounded h-8 md:h-10 shadow-sm"
						type="text"
						name="name"
						bind:value={newItemName}
					/>
					<div class="w-20">
						<Button text="Add" height="h-8 md:h-10" />
					</div>
				</div>

				<input type="hidden" name="category" value={newItemCategoryId} />
				<input type="hidden" name="list" value={data.list.id} />
			</form>

			<!-- TEMPLATE PICKER -->
			{#if data.templates.length > 0 && data.list.isTemplate === false}
				<div class="flex overflow-x-scroll h-10 mt-1 first:pl-0 gap-1">
					{#each data.templates as template}
						<form action="?/addTemplateItemsToList" method="POST" use:enhance>
							<div class="relative">
								<button
									class="p-2 rounded shadow-lg text-gray-700 h-full text-sm text-center bg-accent"
								>
									{template.name || `Template ${template.id.substring(0, 3)}`}
								</button>
								<div class="absolute top-0 right-0" hidden={user.id === template?.owner}>
									<Icon type={IconType.Shared} size="15" stroke={colors.darker} />
								</div>
							</div>
							<input type="hidden" name="template" value={template.id} />
							<input type="hidden" name="list" value={data.list.id} />
						</form>
					{/each}
				</div>
			{:else}
				<div>
					<p class="text-gray-700 text-sm">No templates available</p>
				</div>
			{/if}
		</div>
	</div>
{/if}
