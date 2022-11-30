<script lang="ts">
	import type { GetItem, PostItem } from 'src/models/Item';
	import type { PageData } from './$types';
	import ItemComponent from './ItemComponent.svelte';
	import PocketBase from 'pocketbase';
	import type { Category } from 'src/models/Category';

	const pb = new PocketBase('http://127.0.0.1:8090');

	export let data: PageData;

	let newItemName = '';
	let newItemQuantity = 1;
	let newItemCategoryId = '';
	let newCategoryName = '';
	let showNewCategoryModal = false;

	$: filteredList = data.list.filter((i) => i.picked === false);

	$: proposeCategory(newItemName);

	async function proposeCategory(itemName: string) {
		if (itemName.length < 3) return;

		const resultList = await pb.collection('items').getList(1, 50, {
			filter: `name ~ "${itemName}"`
		});

		if (resultList.items.length === 0) return;

		const item = resultList.items.reverse()[0];
		const categoryId = item.category;
		newItemCategoryId = categoryId;
	}

	async function pickedItem(item: GetItem) {
		const i = data.list.findIndex((i) => i.id === item.id);
		data.list[i] = { ...data.list[i], ...item };

		await pb.collection('items').update(item.id!, {
			picked: item.picked,
			quantity: item.quantity
		});
		reloadListItems();
	}

	async function submitNewItem() {
		const newItem: PostItem = {
			name: newItemName,
			category: newItemCategoryId,
			quantity: newItemQuantity,
			picked: false,
			unit: 'piece',
			listId: data.listId,
			owner: data.userId!
		};
		newItemName = '';
		newItemQuantity = 1;
		await pb.collection('items').create(newItem);

		reloadListItems();
	}

	function setNewItemCategoryId(id: string) {
		newItemCategoryId = id;
	}
	function showAddNewCategory() {
		showNewCategoryModal = true;
	}
	async function addNewCategory() {
		if (newCategoryName.length > 0) {
			await pb.collection('categories').create({ name: newCategoryName, owner: data.userId! });
			newCategoryName = '';
			showNewCategoryModal = false;
		}
		reloadListItems();
	}
	function getItemsPerCategory(cat: Category) {
		return filteredList.filter((i) => i.category!.id === cat.id);
	}

	async function reloadListItems() {
		const itemsList = await pb.collection('items').getList(1, 50, {
			filter: `created >= "2022-01-01 00:00:00" && picked = false && listId = "${data.listId}"`
		});

		const categoriesList = await pb.collection('categories').getList(1, 50, {
			filter: 'created >= "2022-01-01 00:00:00"'
		});

		const categories = categoriesList.items.map((c) => {
			return {
				id: c.id,
				name: c.name
			} as Category;
		});

		const items = itemsList.items.map((i) => {
			const cat = categories.find((cat) => cat.id === i.category);

			return {
				id: i.id,
				name: i.name,
				category: cat,
				owner: i.owner,
				picked: i.picked,
				quantity: i.quantity,
				unit: i.unit
			} as GetItem;
		});

		data.list = items;
		data.categories = categories;
	}

	async function addItemsFromTemplate(id: string) {
		const pb = new PocketBase('http://127.0.0.1:8090');
		const templateItemsList = await pb.collection('items').getList(1, 50, {
			filter: `created >= "2022-01-01 00:00:00" && picked = false && listId = "${id}"`
		});

		const templateItems = templateItemsList.items.map((i) => {
			return {
				name: i.name,
				owner: data.userId,
				picked: false,
				quantity: i.quantity,
				unit: i.unit,
				category: i.category,
				listId: data.listId
			} as PostItem;
		});

		for (let index = 0; index < templateItems.length; index++) {
			const item = templateItems[index];
			const itemsCollection = await pb.collection('items').create(item);
		}

		reloadListItems();
	}
</script>

<div class="">
	<div>
		<a href={`/lists/${data.listId}/edit`}>Edit</a>
	</div>
	{#if filteredList.length === 0}
		<div class="my-auto text-xl">Well done! Now get some 🍦</div>
	{/if}
	<!-- The Items list -->
	<div class="overflow-scroll">
		{#each data.categories as cat}
			{#if getItemsPerCategory(cat).length > 0}
				<div class="text-lg mt-4">{cat.name}</div>
				{#each getItemsPerCategory(cat) as item}
					<ItemComponent {item} on:update={(e) => pickedItem(e.detail)} />
				{/each}
			{/if}
		{/each}
		<div class="h-48" />
	</div>

	<!-- The footer part -->
	<div class="bg-gray-800 p-2 h-36 w-full fixed bottom-0 inline-block align-middle">
		<!-- The categories row -->
		<div class="flex flex-row overflow-x-scroll m-2 h-8">
			{#each data.categories as cat}
				<span
					on:click={() => setNewItemCategoryId(cat.id)}
					on:keydown={() => {}}
					class="p-1 rounded-lg mr-1 text-white  text-sm text-center  {cat.id === newItemCategoryId
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
		<div class="flex flex-row">
			<input class="w-4/6 mx-1 rounded" bind:value={newItemName} type="text" />
			<input class="w-1/6 mx-1 rounded" bind:value={newItemQuantity} type="number" />
			<button
				class="rounded mx-1 px-4 py-1 bg-green-400 disabled:bg-green-50 disabled:text.white"
				on:click={submitNewItem}
				on:keydown={() => {}}
				disabled={newItemName.length === 0 || newItemCategoryId.length === 0}
			>
				Add
			</button>
		</div>

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
