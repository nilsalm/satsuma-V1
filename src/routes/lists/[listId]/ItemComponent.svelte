<script lang="ts">
	import type { Item } from 'src/models/Item';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let item: Item;

	function tickOff() {
		item.picked = !item.picked;
		dispatch('update', item);
	}
	function more() {
		item.quantity += 1;
		dispatch('update', item);
	}
	function less() {
		item.quantity -= 1;
		dispatch('update', item);
	}
</script>

<div
	class="bg-green-400 py-2 w-64 rounded-sm m-1"
	on:dragleave={more}
	on:click={tickOff}
	on:keypress={tickOff}
>
	<div class="flex flex-row">
		<div class="w-8">{item.quantity}</div>
		<div class="font-semibold">{item.name}</div>
	</div>
</div>
