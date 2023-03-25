<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Title title={data.list.name} />
<p>Is Template?</p>
{#if data.list.isTemplate}
	<p>Yes</p>
{:else}
	<p>No</p>
{/if}
