<script lang="ts">
	import type { GetItem } from 'src/models/Item';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let item: GetItem;

	function tickOff() {
		item.picked = !item.picked;
		dispatch('update', item);
	}
	function increase() {
		item.quantity += 1;
		dispatch('update', item);
	}
	function decrease() {
		if (item.quantity > 1) {
			item.quantity -= 1;
			dispatch('update', item);
		}
	}
</script>

<div
	class="bg-gradient-to-r from-yellow-400 to-orange-500 border-b-2 border-gray-200 py-2 px-4 rounded-sm mx-4"
>
	<div class="flex flex-row justify-between">
		<div class="flex flex-row">
			<div class="w-8">{item.quantity}</div>
			<div class="pr-10 font-semibold whitespace-nowrap" on:click={tickOff} on:keypress={tickOff}>
				{item.name}
			</div>
		</div>
		<div class="w-full" on:click={tickOff} on:keypress={tickOff} />
		<div class="flex flex-row">
			<button
				class="bg-gray-400 text-white font-semibold px-2 mx-1  disabled:text-gray-400 disabled:bg-gray-200 border-2  border-gray-300 rounded"
				on:click={decrease}
				on:keypress={decrease}
				disabled={item.quantity <= 1}
			>
				-
			</button>
			<button
				class="bg-gray-400 text-white font-semibold px-2 mx-1  border-2  border-gray-300 rounded"
				on:click={increase}
				on:keypress={increase}
			>
				+
			</button>
		</div>
	</div>
</div>
