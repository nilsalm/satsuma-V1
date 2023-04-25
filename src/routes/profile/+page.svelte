<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Title from '$lib/components/Title.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	export let form;

	$: modalCategoryId = '';

	$: if (form?.success && modalCategoryId != '') closeModal();

	function closeModal() {
		modalCategoryId = '';
		if (form) form.success = false;
	}
</script>

<div class="mb-4 w-full">
	<Title title={'My Profile'} />
</div>

<div class="w-full mt-4 flex flex-col items-center">
	{#if data.categories.length === 0}
		<div class="text-gray-500 text-center">You don't have any categories yet.</div>
	{:else}
		{#each data.categories as category}
			<div class="w-full bg-neutral rounded-lg shadow-lg p-4 mb-4">
				<div class="flex justify-between items-center">
					<div class="text-gray-800 font-bold text-xl">{category.name}</div>
					<div class="flex">
						<!-- <a href="/categories/{category.id}/edit" class="btn btn-primary mr-2">Edit</a> -->
						<Button
							text="Delete"
							onClick={() => {
								modalCategoryId = category.id;
							}}
						/>
					</div>
				</div>
			</div>
		{/each}
	{/if}
</div>

{#if modalCategoryId != ''}
	<div
		class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center"
	>
		<div class="bg-white rounded-lg shadow-lg p-4 mx-2">
			<div class="text-gray-800 font-bold text-xl">
				Are you sure you want to delete this category and all it's items?
			</div>
			<div class="flex justify-center mt-4">
				<form action="?/deleteCategory" method="POST" on:submit|preventDefault use:enhance>
					<input type="text" name="id" class="hidden" value={modalCategoryId} />
					<div class="flex justify-between gap-2">
						<div class="w-20">
							<Button text="Yes" />
						</div>
						<div class="w-20">
							<Button text="No" onClick={closeModal} />
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}
