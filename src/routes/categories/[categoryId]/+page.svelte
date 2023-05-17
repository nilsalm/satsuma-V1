<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Title from '$lib/components/Title.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { category } = data;
	const { items } = data;

	const totalItems = items.length;
	const totalItemsPicked = items.filter((item) => item.picked).length;
	const totalItemsPickedPercentage = Math.round((totalItemsPicked / totalItems) * 100);
	const differentLists = items
		.map((item) => item.list)
		.filter((value, index, self) => self.indexOf(value) === index);
</script>

<div class="px-4">
	<div class="flex justify-between w-full mb-4">
		<Title title={'Edit Category ' + category.name} />

		<a href={'/categories'} class="w-20">
			<Button text="Back" backgroundColor="secondary" textStyle="small" />
		</a>
	</div>

	<div class="my-10 font-normal">
		You have assigned a total of <strong>{totalItems}</strong> items to this category, of which
		<strong>{totalItemsPicked}</strong> are picked. That's
		<strong>{totalItemsPickedPercentage}%</strong>. Those items are in
		<strong>{differentLists.length}</strong> different lists.
	</div>

	<form action="?/updateCategory" method="POST">
		<div class="flex flex-col gap-4">
			<input
				type="text"
				name="name"
				placeholder="Name"
				value={category.name}
				class="bg-neutral px-4 text-md text-gray-700 border-2 border-gray-700 font-semibold rounded h-12 shadow-sm"
			/>

			<Button text="Update category" />
		</div>
	</form>
	<div class="my-2">
		<form action="?/deleteCategory" method="POST" use:enhance>
			<Button height="h-10" text="Delete" backgroundColor="secondary" />
		</form>
	</div>
</div>
