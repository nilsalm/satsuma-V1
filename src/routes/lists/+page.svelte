<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import List from '$lib/components/List.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex justify-between max-w-lg align-bottom">
	<Title title={'My Lists'} />
	<a href="/lists/new" class="border border-gray-700 text-gray-700 rounded px-2 py-1 h-9"
		>Add list</a
	>
</div>

<div class="w-full mt-4 flex flex-col items-center">
	{#if data.lists.length === 0}
		<div class="text-gray-500 text-center">You don't have any lists yet.</div>
		<a href="/lists/new" class="btn btn-primary max-w-md mt-4">Add One</a>
	{:else}
		{#each data.lists as list}
			<List {list} />
		{/each}
	{/if}
</div>
