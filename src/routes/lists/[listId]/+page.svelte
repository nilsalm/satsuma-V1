<script lang="ts">
	import type { Item } from 'src/models/Item';
	import type { PageData } from './$types';
	import ItemComponent from './ItemComponent.svelte';

	export let data: PageData;

	$: filteredList = data.list.filter((i) => !i.gotIt);

	function updateTodo(item: Item) {
		const i = data.list.findIndex((i) => i.id === item.id);
		data.list[i] = { ...data.list[i], ...item };
	}
</script>

<p>Display an actual list here</p>
<p>List Id : {data.listId}</p>

<div>
	{#each filteredList as item}
		<ItemComponent {item} on:update={(e) => updateTodo(e.detail)} />
	{/each}
</div>
