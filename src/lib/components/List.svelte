<script lang="ts">
	import { claim_space } from 'svelte/internal';

	export let list: {
		id: string;
		name: string;
		isTemplate: boolean;
	};
</script>

<a
	href={`/lists/${list.id}`}
	class="rounded-lg aspect-square relative {list.isTemplate
		? 'bg-secondary'
		: 'bg-primary'} shadow-lg"
>
	<div class="flex flex-col text-center h-full justify-center">
		<p class="font-semibold text-neutral">{list.name}</p>
	</div>

	{#if list.isTemplate === true}
		<p class="text-xs text-gray-500 font-light top-3 right-3 absolute">Template</p>
	{/if}
</a>
