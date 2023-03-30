<script lang="ts">
	import { enhance } from '$app/forms';
	import Item from '$lib/components/Item.svelte';
	import Title from '$lib/components/Title.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	// STATE
	let newItemCategoryId = '';
	let newCategoryName = '';
	let showNewCategoryModal = false;

	function setNewItemCategoryId(id: string) {
		newItemCategoryId = id;
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
		{#each data.categories as cat}
			{#if data.items.filter((i) => i.category === cat.id).length > 0}
				<div class="text-lg mt-8 border-primary border-b-4 text-primary font-semibold">
					<p>{cat.name}</p>
				</div>
				{#each data.items.filter((i) => i.category === cat.id) as item}
					<Item {item} />
				{/each}
			{/if}
		{/each}
	{/if}
</div>

<div class="max-w-lg pb-4">
	<div class="flex overflow-x-scroll my-2 h-12 p-2 bg-secondary gap-1">
		{#each data.categories as cat}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				on:click={() => setNewItemCategoryId(cat.id)}
				class="p-1 bg-neutral rounded-lg text-gray-700 text-sm text-center {cat.id ===
				newItemCategoryId
					? 'border-2 border-primary'
					: 'border-2 border-neutral'}"
			>
				{cat.name}
			</div>
		{/each}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		{#if showNewCategoryModal === false}
			<div
				on:click={() => {
					showNewCategoryModal = true;
				}}
				class="py-1 rounded-lg text-gray-700 text-xs text-center bg-accent cursor-pointer"
			>
				<div class="text-sm px-2">+</div>
			</div>
		{:else}
			<form action="?/createCategory" method="POST" use:enhance>
				<div class="flex flex-row px-1 gap-1">
					<input
						class="w-28 text-gray-700 text-xs bg-neutral border-0 rounded-md"
						bind:value={newCategoryName}
						name="name"
						type="text"
					/>
					<button
						class="rounded px-3 bg-primary disabled:opacity-70 disabled:text-gray-300 text-gray-700"
						disabled={newCategoryName.length === 0}
					>
						Add
					</button>
				</div>
			</form>
		{/if}
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
	{#if data.templates.length > 0 && data.list.isTemplate === false}
		<div class="flex flex-row overflow-x-scroll m-2">
			{#each data.templates as template}
				<form action="?/addTemplateItemsToList" method="POST" use:enhance>
					<button class="p-1 rounded-lg mr-1 text-gray-700 h-6 text-xs text-center bg-accent">
						{template.name || `Template ${template.id.substring(0, 3)}`}
					</button>
					<input type="hidden" name="template" value={template.id} />
					<input type="hidden" name="list" value={data.list.id} />
				</form>
			{/each}
		</div>
	{/if}
</div>
