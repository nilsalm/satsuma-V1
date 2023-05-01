<script lang="ts">
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let item: {
		id: string;
		name: string;
		picked: boolean;
		user: string;
		list: string;
		category: string;
		quantity: number;
		expand: {
			id: string;
			name: string;
		};
	};

	function tickOff() {
		item.picked = true;
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

<div class="border-b-2 last:border-0 border-secondary py-2 px-4 rounded-sm mx-4 mt-1">
	<div class="flex flex-row">
		<div class="flex-grow">
			<form action="?/pickItem" method="POST" use:enhance>
				<button class="flex items-start w-full">
					<div class="pr-4 w-8 text-gray-700">{item.quantity}</div>
					<div
						class=" text-gray-700 font-semibold whitespace-nowrap"
						on:click={tickOff}
						on:keypress={tickOff}
					>
						{item.name}
					</div>
				</button>
				<input type="hidden" name="id" value={item.id} />
				<input type="hidden" name="picked" value={item.picked} />
			</form>
		</div>

		<div class="flex gap-6">
			<form action="?/increaseItem" method="POST" use:enhance>
				<button
					class=" text-gray-700 font-semibold px-2 disabled:opacity-0 border-2 border-primary rounded"
					on:click={decrease}
					on:keypress={decrease}
					disabled={item.quantity <= 1}
				>
					-
				</button>
				<button
					class="text-gray-700 font-semibold px-2 border-2 border-primary rounded"
					on:click={increase}
					on:keypress={increase}
				>
					+
				</button>
				<input type="hidden" name="id" value={item.id} />
				<input type="hidden" name="quantity" value={item.quantity} />
			</form>
		</div>
	</div>
</div>
