<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Title from '$lib/components/Title.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { category } = data;
</script>

<div class="px-4">
	<div class="flex justify-between w-full mb-4">
		<Title title={'Edit Category ' + category.name} />

		<a href={'/categories'} class="w-20">
			<Button text="Back" backgroundColor="secondary" textStyle="small" />
		</a>
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
