<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import List from '$lib/components/List.svelte';
	import type { PageData } from './$types';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;

	function createList() {
		goto('/lists/new');
	}
</script>

<div class="flex justify-between w-full mb-4">
	<Title title={'My Lists'} />

	<div class="w-1/6" class:hidden={data.lists.length === 0}>
		<Button text="Add list" backgroundColor="secondary" textStyle="small" onClick={createList} />
	</div>
</div>

<div class="w-full mt-4 flex flex-col items-center">
	{#if data.lists.length === 0}
		<div class="text-gray-500 text-center mt-20">You don't have any lists yet.</div>
		<Button text={'Add list'} backgroundColor={'secondary'} onClick={createList} />
	{:else}
		<div class="grid grid-cols-4 gap-4">
			{#each data.lists as list}
				<List {list} />
			{/each}
		</div>
	{/if}
</div>
