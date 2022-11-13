<script lang="ts">
	import type { GetItem, PostItem } from 'src/models/Item';
	import type { PageData } from './$types';
	import ItemComponent from './ItemComponent.svelte';
	import PocketBase from 'pocketbase';
	import type { Category } from 'src/models/Category';
	import { load } from './+page';

	const client = new PocketBase('http://127.0.0.1:8090');

	export let data: PageData;

	let newItemName = '';
	let newItemQuantity = 1;
	let newItemCategory = '';
	let newItemCategoryId = '';

	$: filteredList = data.list.filter((i) => i.picked === false);

	async function updateTodo(item: GetItem) {
		const i = data.list.findIndex((i) => i.id === item.id);
		data.list[i] = { ...data.list[i], ...item };

		await client.records.update('items', item.id!, { picked: true });
		reloadListItems();
	}

	async function submitNewItem() {
		console.log('data', data, client.authStore.model?.id);
		const newItem: PostItem = {
			name: newItemName,
			category: newItemCategoryId,
			quantity: newItemQuantity,
			picked: false,
			unit: 'piece',
			listId: data.listId,
			addedBy: data.userId!
		};
		newItemName = '';
		newItemQuantity = 1;
		await client.records.create('items', newItem);

		reloadListItems();
	}

	function setNewItemCategoryId(id: string) {
		newItemCategoryId = id;
	}

	function getItemsPerCategory(cat: Category) {
		return filteredList.filter((i) => i.category!.id === cat.id);
	}

	async function reloadListItems() {
		const client = new PocketBase('http://127.0.0.1:8090');
		const itemsList = await client.records.getList('items', 1, 50, {
			filter: 'created >= "2022-01-01 00:00:00" && picked = false'
		});
		console.log(itemsList);

		const categoriesList = await client.records.getList('categories', 1, 50, {
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
				addedBy: i.addedBy,
				picked: i.picked,
				quantity: i.quantity,
				unit: i.unit
			} as GetItem;
		});

		data.list = items;
		data.categories = categories;
	}
</script>

<p>Display an actual list here</p>
<p>List Id : {data.listId}</p>
<div class="h-fit">
	<div class="h-full overflow-scroll">
		{#each data.categories as cat}
			{#if getItemsPerCategory(cat).length > 0}
				<div class="text-lg mt-4">{cat.name}</div>
				{#each getItemsPerCategory(cat) as item}
					<ItemComponent {item} on:update={(e) => updateTodo(e.detail)} />
				{/each}
			{/if}
		{/each}
	</div>

	<div class="bg-gray-100 p-2 fixed bottom-0 mb-4">
		<div class="flex flex-row overflow-x-scroll m-2">
			{#each data.categories as cat}
				<div
					on:click={setNewItemCategoryId(cat.id)}
					on:keydown={() => {}}
					class="bg-blue-600 p-1 rounded-lg ml-1 text-white h-6 text-xs text-center"
				>
					{cat.name}
				</div>
			{/each}
		</div>
		<input class="w-3/6" bind:value={newItemName} type="text" />
		<input class="w-1/6" bind:value={newItemQuantity} type="number" />
		<button class="w-1/6" on:click={submitNewItem}>Add</button>
	</div>
</div>
