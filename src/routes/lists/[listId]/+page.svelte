<script lang="ts">
	import type { GetItem, PostItem } from 'src/models/Item';
	import type { PageData } from './$types';
	import ItemComponent from './ItemComponent.svelte';
	import PocketBase from 'pocketbase';
	import type { Category } from 'src/models/Category';

	const client = new PocketBase('http://127.0.0.1:8090');

	export let data: PageData;

	let newItemName = '';
	let newItemQuantity = 1;
	let newItemCategoryId = '';

	$: filteredList = data.list.filter((i) => i.picked === false);

	async function updateTodo(item: GetItem) {
		const i = data.list.findIndex((i) => i.id === item.id);
		data.list[i] = { ...data.list[i], ...item };

		await client.records.update('items', item.id!, { picked: true });
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
			filter: `created >= "2022-01-01 00:00:00" && picked = false && listId = "${data.listId}"`
		});

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

	async function addItemsFromTemplate(id: string) {
		const client = new PocketBase('http://127.0.0.1:8090');
		const templateItemsList = await client.records.getList('items', 1, 50, {
			filter: `created >= "2022-01-01 00:00:00" && picked = false && listId = "${id}"`
		});

		const templateItems = templateItemsList.items.map((i) => {
			return {
				name: i.name,
				addedBy: data.userId,
				picked: false,
				quantity: i.quantity,
				unit: i.unit,
				category: i.category,
				listId: data.listId
			} as PostItem;
		});

		for (let index = 0; index < templateItems.length; index++) {
			const item = templateItems[index];
			const record = await client.records.create('items', item);
		}

		reloadListItems();
	}
</script>

<div class="h-fit">
	<div>
		<a href={`/lists/${data.listId}/edit`}>Edit</a>
	</div>
	{#if filteredList.length === 0}
		<div class="my-auto text-xl">Well done! Now get some 🍦</div>
	{/if}
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
					on:click={() => setNewItemCategoryId(cat.id)}
					on:keydown={() => {}}
					class="p-1 rounded-lg ml-1 text-white h-6 text-xs text-center {cat.id ===
					newItemCategoryId
						? 'bg-blue-600'
						: 'bg-blue-400'}"
				>
					{cat.name}
				</div>
			{/each}
		</div>
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
		<div class="flex flex-row overflow-x-scroll m-2">
			{#each data.templates as template}
				<div
					on:click={() => addItemsFromTemplate(template.id)}
					on:keydown={() => {}}
					class="p-1 rounded-lg ml-1 text-white h-6 text-xs text-center bg-yellow-500"
				>
					{template.name || `Template ${template.id.substring(0, 3)}`}
				</div>
			{/each}
		</div>
	</div>
</div>
