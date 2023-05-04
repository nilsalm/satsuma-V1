<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import List from '$lib/components/List.svelte';
	import type { PageData } from './$types';
	import Button from '$lib/components/Button.svelte';

	export let data: PageData;

	const allLists = data.lists;
	const templateLists = allLists.filter((list) => list.isTemplate === true);
	const lists = allLists.filter((list) => list.isTemplate === false);
</script>

<div class="px-4">
	<div class="flex justify-between w-full mb-4">
		<Title title="My Lists" />

		<a href="/lists/new" class="w-20" class:hidden={allLists.length === 0}>
			<Button text="Add list" backgroundColor="secondary" textStyle="small" />
		</a>
	</div>

	<div class="w-full mt-4 flex flex-col items-center">
		{#if allLists.length === 0}
			<div class="text-gray-500 text-center mt-20">You don't have any lists yet.</div>
			<a href="/lists/new" class="w-20">
				<Button text={'Add list'} backgroundColor={'secondary'} />
			</a>
		{:else}
			<div class="flex flex-col gap-4 w-full">
				<div class="container m-auto grid grid-cols-2 md:grid-cols-4 gap-4">
					{#each lists as list}
						<List {list} />
					{/each}
				</div>
				{#if templateLists.length > 0}
					<Title title="My Templates" />
					<div class="container m-auto grid grid-cols-2 md:grid-cols-4 gap-4">
						{#each templateLists as list}
							<List {list} />
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
