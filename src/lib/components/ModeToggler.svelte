<script lang="ts">
	import { createEventDispatcher } from 'svelte';
  import { State } from '$lib/types/ItemEditorState';

	const dispatch = createEventDispatcher();

  let mode = State.CLOSED

	function toggleMode() {
		if (mode === State.ADD) {
      mode = State.TEMPLATES;
    } else if (mode === State.TEMPLATES) {
      mode = State.CLOSED;
    } else {
      mode = State.ADD;
    }

		dispatch('switchMode', { mode });
	}
</script>

<button
	class="flex flex-col font-bold gap-4 py-3 md:py-4 px-5 md:px-6 bg-accent rounded-full shadow-md"
	on:click={toggleMode}
>
	{#if mode === State.ADD}
		<div>T</div>
	{:else if mode === State.TEMPLATES}
		<div>X</div>
	{:else if mode === State.CLOSED}
		<div>+</div>
	{/if}
</button>
