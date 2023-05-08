<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let mode = 0;

	function toggleMode() {
		mode = (mode + 1) % 3;
		dispatch('switchMode', { mode });
	}
</script>

<button
	class="flex flex-col gap-4 py-4 px-6 bg-accent rounded-full shadow-md"
	on:click={toggleMode}
>
	{#if mode === 1}
		<div>+</div>
	{:else if mode === 2}
		<div>T</div>
	{:else}
		<div>0</div>
	{/if}
</button>
