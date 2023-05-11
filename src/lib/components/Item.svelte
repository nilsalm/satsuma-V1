<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Item } from '$lib/models/Item';
	import { isPlanModeActive } from '$lib/stores/mode';

	export let item: Item;
	export let newCategoryId: string | null;
</script>

<div
	class="border-b-2 last:border-0 border-secondary rounded-sm px-2 mt-1
	{item.picked && 'opacity-50'}"
>
	<div class="flex flex-row justify-between items-center">
		<form action="?/pickItem" method="POST" use:enhance>
			<button class="flex gap-4 py-2">
				<div class="w-4 text-right text-gray-700">{item.quantity}</div>
				<div
					class="text-gray-700 text-left font-semibold w-[calc(100vw-190px)] sm:w-[360px] truncate whitespace-nowrap
					{item.picked && 'line-through'}"
				>
					{item.name}
				</div>
			</button>
			<input type="hidden" name="id" value={item.id} />
			<input type="hidden" name="picked" value={!item.picked} />
		</form>

		{#if !item.picked}
			<div class="flex gap-2">
				<form action="?/decreaseItem" method="POST" use:enhance>
					<button
						class=" text-gray-700 font-semibold px-2 disabled:opacity-30 border-2 border-primary rounded"
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
				{#if $isPlanModeActive}
					<form action="?/setCategory" method="POST" use:enhance>
						<button
							class="text-gray-700 font-semibold px-2 disabled:opacity-30 border-2 border-primary rounded"
							disabled={!newCategoryId}
						>
							🔀
						</button>
						<input type="hidden" name="id" value={item.id} />
						<input type="hidden" name="category" value={newCategoryId} />
					</form>
				{/if}
			</div>
		{/if}
	</div>
</div>
