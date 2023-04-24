<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import List from '$lib/components/List.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex justify-between w-full align-bottom">
	<Title title={'My Lists'} />
	<a href="/lists/new" class="btn btn-accent" class:hidden={data.lists.length === 0}>Add list</a>
</div>

<div class="w-full mt-4 flex flex-col items-center">
	{#if data.lists.length === 0}
		<div class="text-gray-500 text-center mt-20">You don't have any lists yet.</div>
		<a href="/lists/new" class="btn btn-primary max-w-md mt-4">Add list</a>
	{:else}
		<div class="grid grid-cols-4 gap-4">
			{#each data.lists as list}
				<List {list} />
			{/each}
		</div>
	{/if}
</div>
