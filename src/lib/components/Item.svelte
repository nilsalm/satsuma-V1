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
</script>

<div class="border-b-2 last:border-0 border-secondary py-2 rounded-sm mx-2 mt-1">
	<div class="flex flex-row justify-between w-full">
		<div class="">
			<form action="?/pickItem" method="POST" use:enhance>
				<button class="flex">
					<div class="w-4 mr-2 text-right text-gray-700">{item.quantity}</div>
					<div
						class="text-gray-700 text-left font-semibold max-w-[calc(100vw-150px)] truncate whitespace-nowrap"
					>
						{item.name}
					</div>
				</button>
				<input type="hidden" name="id" value={item.id} />
				<input type="hidden" name="picked" value={true} />
			</form>
		</div>

		<div class="flex gap-2">
			<form action="?/decreaseItem" method="POST" use:enhance>
				<button
					class=" text-gray-700 font-semibold px-2 disabled:opacity-0 border-2 border-primary rounded"
					disabled={item.quantity <= 1}
				>
					-
				</button>
				<input type="hidden" name="id" value={item.id} />
				<input type="hidden" name="quantity" value={item.quantity - 1} />
			</form>
			<form action="?/increaseItem" method="POST" use:enhance>
				<button class="text-gray-700 font-semibold px-2 border-2 border-primary rounded">
					+
				</button>
				<input type="hidden" name="id" value={item.id} />
				<input type="hidden" name="quantity" value={item.quantity + 1} />
			</form>
		</div>
	</div>
</div>
