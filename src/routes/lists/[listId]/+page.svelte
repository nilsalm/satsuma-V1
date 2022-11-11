<script lang="ts">
	import type { ShoppingListItemModel } from 'src/ShoppingListItemModel';
	import type { PageData } from './$types';
	import Item from './Item.svelte';

	export let data: PageData;

	$: filteredList = data.list.filter((i) => !i.gotIt);

	function updateTodo(item: ShoppingListItemModel) {
		const i = data.list.findIndex((i) => i.id === item.id);
		data.list[i] = { ...data.list[i], ...item };
	}
</script>

<p>Display an actual list here</p>
<p>List Id : {data.listId}</p>

<div>
	{#each filteredList as item}
		<Item {item} on:update={(e) => updateTodo(e.detail)} />
	{/each}
</div>
