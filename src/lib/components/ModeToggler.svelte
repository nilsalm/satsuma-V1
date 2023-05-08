<script lang="ts">
	import { createEventDispatcher } from 'svelte';
  import { ItemAdderState } from '$lib/types/ItemAdderState';

	const dispatch = createEventDispatcher();

  let mode = ItemAdderState.CLOSED

	function toggleMode() {
		if (mode === ItemAdderState.ADD) {
      mode = ItemAdderState.TEMPLATES;
    } else if (mode === ItemAdderState.TEMPLATES) {
      mode = ItemAdderState.CLOSED;
    } else {
      mode = ItemAdderState.ADD;
    }

		dispatch('switchMode', { mode });
	}
</script>

<button
	class="flex flex-col font-bold gap-4 py-3 md:py-4 px-5 md:px-6 bg-accent rounded-full shadow-md"
	on:click={toggleMode}
>
	{#if mode === ItemAdderState.ADD}
		<div>T</div>
	{:else if mode === ItemAdderState.TEMPLATES}
		<div>X</div>
	{:else if mode === ItemAdderState.CLOSED}
		<div>+</div>
	{/if}
</button>
