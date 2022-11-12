<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	console.log('Lists', data.lists);
</script>

<p>My Lists</p>

<div class="grid gap-2 justify-start">
	{#each data.lists.items as list}
		<a href="/lists/{list.id}" class="bg-yellow-500 rounded-xl w-24 h-24 text-center">
			<div class="flex flex-col justify-center h-full">
				<div class="">list</div>
				<div class="text-xs">
					{list.id}
				</div>
			</div>
		</a>
	{/each}
</div>
