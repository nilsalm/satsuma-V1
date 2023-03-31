<script lang="ts">
	import { enhance } from '$app/forms';
	import Title from '$lib/components/Title.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Title title={'My Profile'} />

<div class="max-w-lg mt-4 flex flex-col items-center">
	{#if data.categories.length === 0}
		<div class="text-gray-500 text-center">You don't have any categories yet.</div>
	{:else}
		{#each data.categories as category}
			<div class="w-full bg-white rounded-lg shadow-lg p-4 mb-4">
				<div class="flex justify-between items-center">
					<div class="text-gray-800 font-bold text-xl">{category.name}</div>
					<div class="flex">
						<!-- <a href="/categories/{category.id}/edit" class="btn btn-primary mr-2">Edit</a> -->

						<form action="?/deleteCategory" method="POST" use:enhance>
							<input type="text" name="id" class="hidden" value={category.id} />
							<button class="btn btn-secondary">Delete</button>
						</form>
					</div>
				</div>
			</div>
		{/each}
	{/if}
</div>
