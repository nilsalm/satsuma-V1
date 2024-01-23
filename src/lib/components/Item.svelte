<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Item } from '$lib/models/Item';
	import { deleteItemQuery, updateItemQuery } from '$lib/pocketbase';
	import { isPlanModeActive } from '$lib/stores/mode';
	import { createEventDispatcher } from 'svelte';
	import Icon from './Icon.svelte';
	import { IconType } from '$lib/types/IconType';
	import { colors } from '$lib/util';

	export let item: Item;
	export let newCategoryId: string | null;

	const dispatch = createEventDispatcher();

	async function increaseItem() {
		if (item.quantity >= 100) item.quantity = item.quantity + 50;
		else if (item.quantity >= 25) item.quantity = item.quantity + 5;
		else item.quantity++;
		dispatch('updated', { item });
		await updateItemQuery(item);
	}
	async function decreaseItem() {
		if (item.quantity >= 100) item.quantity = item.quantity - 50;
		else if (item.quantity >= 25) item.quantity = item.quantity - 5;
		else item.quantity--;
		dispatch('updated', { item });
		await updateItemQuery(item);
	}
	async function togglePickedItem() {
		item.picked = !item.picked;
		dispatch('updated', { item });
		await updateItemQuery(item);
	}
	async function pickItem() {
		item.picked = true;
		dispatch('updated', { item });
		await updateItemQuery(item);
	}
	async function deleteItem() {
		item.picked = true; // simple workaround to hide the local item
		dispatch('updated', { item });
		await deleteItemQuery(item);
	}
</script>

<div
	class="border-b-2 last:border-0 border-secondary rounded-sm px-2 mt-1
	{item.picked && 'opacity-50'}"
>
	<!-- // TODO breaks for unreasonable long item names -->
	<div class="flex flex-row justify-between items-center">
		<div class="flex gap-4 py-2 flex-grow mr-8">
			<div class="w-4 text-right text-gray-700">{item.quantity}</div>
			<div
				class="text-gray-700 text-left font-semibold sm:w-[310px] truncate whitespace-nowrap
					{item.picked && 'line-through'}"
			>
				{item.name}
			</div>
		</div>

		{#if !item.picked}
			<div class="flex gap-2">
				{#if $isPlanModeActive}
					<button
						class="w-6 h-6 disabled:opacity-30 border-2 border-primary rounded"
						disabled={item.quantity <= 1}
						on:click={decreaseItem}
					>
						<Icon type={IconType.Minus} size="20" stroke={colors.darker} />
					</button>

					<button class="w-6 h-6 border-2 border-primary rounded" on:click={increaseItem}>
						<Icon type={IconType.Plus} size="20" stroke={colors.darker} />
					</button>

					<form action="?/setCategory" method="POST" use:enhance>
						<button
							class="w-6 h-6 disabled:opacity-30 border-2 border-primary rounded"
							disabled={!newCategoryId}
						>
							<Icon type={IconType.Switch} size="20" stroke={colors.darker} />
						</button>
						<input type="hidden" name="id" value={item.id} />
						<input type="hidden" name="category" value={newCategoryId} />
					</form>
					<button class="w-6 h-6 border-2 border-primary rounded" on:click={deleteItem}>
						<Icon type={IconType.Decline} size="20" stroke={colors.darker} />
					</button>
				{:else}
					<!-- form is bullshit workaround to align with the height of the form in the if. -->
					<form action="">
						<button class="w-6 h-6 border-2 border-primary rounded" on:click={pickItem}>
							<Icon type={IconType.Accept} size="20" stroke={colors.darker} />
						</button>
					</form>
				{/if}
			</div>
		{/if}
	</div>
</div>
