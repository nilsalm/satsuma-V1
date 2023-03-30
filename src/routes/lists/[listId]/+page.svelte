<script lang="ts">
	import { enhance } from '$app/forms';
	import Item from '$lib/components/Item.svelte';
	import Title from '$lib/components/Title.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PageData } from './$types';

	export let data: PageData;

	// STATE
	let newItemCategoryId = '';
	let newCategoryName = '';
	let showNewCategoryModal = false;

	function setNewItemCategoryId(id: string) {
		newItemCategoryId = id;
	}
	function showAddNewCategory() {
		showNewCategoryModal = true;
	}
</script>

<Title title={data.list.name} />
{#if data.list.isTemplate}
	<p>Template</p>
{/if}
<div class="max-w-lg">
	{#if data.items.length === 0}
		<div class="text-center h-full mt-20">
			<p>Good job!</p>
			<p>Now get yourself some ice cream 🍦</p>
		</div>
	{:else}
		{#each data.items as item}
			<Item {item} />
		{/each}
	{/if}
</div>

<div class="max-w-lg pb-4">
	<div class="flex overflow-x-scroll m-2 h-8">
		{#each data.categories as cat}
			<span
				on:click={() => setNewItemCategoryId(cat.id)}
				on:keydown={() => {}}
				class="p-1 rounded-lg mr-1 text-sm text-center {cat.id === newItemCategoryId
					? 'bg-secondary text-gray-700'
					: 'bg-primary text-gray-200'}"
			>
				{cat.name}
			</span>
		{/each}
		<div
			on:click={() => showAddNewCategory()}
			on:keydown={() => showAddNewCategory()}
			class="py-1 rounded-lg text-gray-700 text-xs text-center bg-secondary"
		>
			{#if showNewCategoryModal === false}
				<div class="text-sm px-2">+</div>
			{:else}
				<form action="?/createCategory" method="POST" use:enhance>
					<div class="flex flex-row px-1">
						<input
							class="w-24 text-black text-xs h-8 bg-transparent border-0 rounded opacity-60"
							bind:value={newCategoryName}
							name="name"
							type="text"
						/>
						<button
							class="rounded ml-1 py-1 px-1 bg-accent disabled:opacity-40 border disabled:text-gray-400 text-gray-700"
							disabled={newCategoryName.length === 0}
						>
							Add
						</button>
					</div>
				</form>
			{/if}
		</div>
	</div>

	<div class="flex">
		<div class="flex-grow">
			<form action="?/createItem" method="POST" use:enhance>
				<div class="w-full flex items-start gap-4 align-bottom">
					<input
						class="w-full border-0 border-b-2 rounded bg-secondary px-4 text-gray-700"
						type="text"
						name="name"
					/>
					<button class="btn btn-accent" type="submit">Add</button>
				</div>

				<input type="hidden" name="category" value={newItemCategoryId} />
				<input type="hidden" name="list" value={data.list.id} />
			</form>
		</div>
	</div>
</div>
