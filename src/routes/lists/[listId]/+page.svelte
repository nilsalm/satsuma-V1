<script lang="ts">
	import Item from '$lib/components/Item.svelte';
	import Title from '$lib/components/Title.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Title title={data.list.name} />
{#if data.list.isTemplate}
	<p>Template</p>
{/if}
<div class="max-w-md">
	{#if data.items.length === 0}
		<div class="text-center h-full mt-20">
			<p>Good job!</p>
			<p>Now get yourself some ice cream 🍦</p>
		</div>
	{:else}
		{#each data.items as item}
			<Item {item} />
		{/each}
	{/if}
</div>
