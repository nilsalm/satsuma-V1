<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	let localPlanMode = false;

	const isPlanModeActive = writable();

	function togglePlanMode() {
		localPlanMode = !localPlanMode;
		isPlanModeActive.set(localPlanMode);
	}

	setContext('isPlanModeActive', isPlanModeActive);
</script>

<button
	on:click={togglePlanMode}
	class="text-sm hover:bg-darker py-1 w-full my-2 rounded-lg flex justify-center hover:bg-opacity-30"
>
	<div class="h-full flex justify-center items-center gap-2">
		{#if !localPlanMode}
			<div class="text-2xl md:text-3xl">🛒</div>
			<div class="text-gray-700 font-bold text-xl md:text-2xl">Shopping</div>
			{:else}
			<div class="text-2xl md:text-3xl">📚</div>
			<div class="text-gray-700 font-bold text-xl md:text-2xl">Planning</div>
		{/if}
	</div>
</button>
