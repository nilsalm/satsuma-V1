<script lang="ts">
	import type { GetItem, PostItem } from 'src/models/Item';
	import type { PageData } from './$types';
	import ItemComponent from './ItemComponent.svelte';

	import type { Category } from 'src/models/Category';
	import { getPbClient } from '$lib/usePocketBase';
	import type { ListResult } from 'pocketbase';

	const pb = getPbClient();

	export let data: PageData;

	let newItemName = '';
	let newItemQuantity = 1;
	let newItemCategoryId = '';
	let newCategoryName = '';
	let showNewCategoryModal = false;

	let myList = data.list;
	$: filteredList = [...myList.filter((i) => i.picked === false)];
	$: categories = [...data.categories];

	$: proposeCategory(newItemName);

	$: console.log(filteredList);

	async function proposeCategory(itemName: string) {
		if (itemName.length < 3) return;

		let resultList: ListResult<any>;

		try {
			resultList = await pb.collection('items').getList(1, 50, {
				filter: `name ~ "${itemName}"`
			});
		} catch (ClientResponseError) {
			return;
		}

		if (resultList.items.length === 0) return;

		const item = resultList.items.reverse()[0];
		const categoryId = item.category;
		newItemCategoryId = categoryId;
	}

	async function updateItem(item: GetItem) {
		const i = myList.findIndex((i) => i.id === item.id);
		myList[i] = item;

		const updated = await pb.collection('items').update(item.id!, {
			picked: item.picked,
			quantity: item.quantity
		});

		filteredList = filteredList.map((i) => {
			if (i.id === item.id) {
				i.quantity = i.quantity;
				i.picked = i.picked;
			}
			return i;
		});
	}

	async function submitNewItem(e) {
		e.preventDefault();
		const item = filteredList.find((item) => item.name.toLowerCase() === newItemName.toLowerCase());

		if (item) {
			await increaseExistingItem(item);
		} else {
			const newItem: PostItem = {
				name: newItemName,
				category: newItemCategoryId,
				quantity: newItemQuantity,
				picked: false,
				unit: 'piece',
				listId: data.listId,
				owner: data.userId!
			};
			await addNewItemToList(newItem);
		}
	}

	function setNewItemCategoryId(id: string) {
		newItemCategoryId = id;
	}
	function showAddNewCategory() {
		showNewCategoryModal = true;
	}
	async function addNewCategory() {
		if (newCategoryName.length > 0) {
			const createdCategory: Category = await pb
				.collection('categories')
				.create({ name: newCategoryName, owner: data.userId! });
			categories = [...categories, createdCategory];
		}
		newCategoryName = '';
		showNewCategoryModal = false;
	}

	async function addItemsFromTemplate(id: string) {
		const templateItemsList = await pb.collection('items').getList(1, 50, {
			filter: `created >= "2022-01-01 00:00:00" && picked = false && listId = "${id}"`
		});

		const templateItems = templateItemsList.items.map((i) => {
			const cat = categories.find((cat) => cat.id === i.category);

			return {
				id: i.id,
				name: i.name,
				owner: data.userId,
				picked: false,
				quantity: i.quantity,
				unit: i.unit,
				category: cat,
				listId: data.listId
			} as GetItem;
		});

		// TODO use Promise.all + map instead
		for (let index = 0; index < templateItems.length; index++) {
			const item = templateItems[index];

			const itemExists = filteredList.find((i) => i.name.toLowerCase() === item.name.toLowerCase());

			if (itemExists) {
				await increaseExistingItem(itemExists, item.quantity);
			} else {
				const newItem: PostItem = {
					name: item.name,
					owner: data.userId!,
					picked: false,
					quantity: item.quantity,
					unit: item.unit,
					category: item.category?.id!,
					listId: data.listId
				};
				await addNewItemToList(newItem);
			}
		}
	}

	async function addNewItemToList(item: PostItem) {
		const created = await pb.collection('items').create(item);
		const thisCategory = categories.find((cat) => cat.id === item.category) as Category;
		const newGetItem: GetItem = {
			id: created.id,
			name: created.name,
			category: thisCategory,
			quantity: created.quantity,
			picked: created.picked,
			unit: created.unit,
			listId: created.listId,
			owner: created.userId
		};

		filteredList = [...filteredList, newGetItem];

		newItemName = '';
		newItemQuantity = 1;
	}

	async function increaseExistingItem(item: GetItem, inc: number = 1) {
		const newQuantity = item.quantity + inc;
		await pb.collection('items').update(item.id, { quantity: newQuantity });

		filteredList = filteredList.map((i) => {
			if (i.id === item.id) {
				i.quantity = newQuantity;
			}
			return i;
		});
	}
</script>

<div>
	<div>
		<a href={`/lists/${data.listId}/edit`}>Edit</a>
	</div>
	{#if filteredList.length === 0}
		<div class="my-auto text-xl">Well done! Now get some 🍦</div>
	{/if}
	<!-- The Items list -->
	<div class="overflow-scroll">
		{#each data.categories as cat}
			{#if filteredList.filter((i) => i.category.id === cat.id).length > 0}
				<div class="text-lg mt-4">{cat.name}</div>
				{#each filteredList.filter((i) => i.category.id === cat.id) as item}
					<ItemComponent {item} on:update={(e) => updateItem(e.detail)} />
				{/each}
			{/if}
		{/each}

		<div class="h-48" />
	</div>

	<!-- The footer part -->
	<div class="bg-gray-800 p-2 h-36 w-full fixed bottom-0 inline-block align-middle">
		<!-- The categories row -->
		<div class="flex flex-row overflow-x-scroll m-2 h-8">
			{#each categories as cat}
				<span
					on:click={() => setNewItemCategoryId(cat.id)}
					on:keydown={() => {}}
					class="p-1 rounded-lg mr-1 text-white text-sm text-center {cat.id === newItemCategoryId
						? 'bg-blue-600'
						: 'bg-blue-400'}"
				>
					{cat.name}
				</span>
			{/each}
			<div
				on:click={() => showAddNewCategory()}
				on:keydown={() => {}}
				class="py-1 rounded-lg text-white text-xs text-center bg-gradient-to-r from-red-400 to-purple-400"
			>
				{#if showNewCategoryModal === false}
					<div class="text-sm px-2">+</div>
				{:else}
					<div class="flex flex-row px-1">
						<input
							class="w-24 text-black mx-1 rounded opacity-60"
							bind:value={newCategoryName}
							type="text"
						/>
						<button
							class="rounded mx-1 py-1 px-1 bg-green-800 disabled:opacity-20 disabled:text-white"
							on:click={addNewCategory}
							on:keydown={() => {}}
							disabled={newCategoryName.length === 0}
						>
							Add
						</button>
					</div>
				{/if}
			</div>
		</div>

		<!-- The Text input -->

		<form class="flex flex-row" on:submit={submitNewItem}>
			<input class="w-5/6 mx-1 rounded" bind:value={newItemName} type="text" />
			<!-- <input class="w-1/6 mx-1 rounded" bind:value={newItemQuantity} type="number" /> -->
			<button
				class="rounded mx-1 px-3 py-1 bg-green-400 disabled:bg-green-50 disabled:text.white"
				on:click={submitNewItem}
				disabled={newItemName.length === 0 || newItemCategoryId.length === 0}
			>
				Add
			</button>
		</form>

		<!-- The Templates row -->
		<div class="flex flex-row overflow-x-scroll m-2">
			{#each data.templates as template}
				<div
					on:click={() => addItemsFromTemplate(template.id)}
					on:keydown={() => {}}
					class="p-1 rounded-lg mr-1 text-white h-6 text-xs text-center bg-yellow-500"
				>
					{template.name || `Template ${template.id.substring(0, 3)}`}
				</div>
			{/each}
		</div>
	</div>
</div>
