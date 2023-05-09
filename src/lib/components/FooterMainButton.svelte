<script lang="ts">
	import { isPlanModeActive } from '$lib/stores/mode';

	let localPlanMode = false;

	function togglePlanMode() {
		localPlanMode = !localPlanMode;
		isPlanModeActive.set(localPlanMode);
	}
</script>

<button
	on:click={togglePlanMode}
	class="text-sm hover:bg-darker py-1 w-full my-1 rounded-lg flex justify-center hover:bg-opacity-30"
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
