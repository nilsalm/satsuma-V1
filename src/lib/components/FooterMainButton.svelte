<script lang="ts">
	import { isPlanModeActive } from '$lib/stores/mode';
	import Logo from './Logo.svelte';

	let localPlanMode = false;

	function togglePlanMode() {
		localPlanMode = !localPlanMode;
		isPlanModeActive.set(localPlanMode);
	}
</script>

<button
	on:click={togglePlanMode}
	class="text-sm py-1 my-1 rounded-lg flex justify-center cursor-pointer"
>
	<div class="h-full flex flex-col justify-center text-center items-center gap-2">
		{#if !localPlanMode}
			<div class="w-12 h-12">
				<Logo />
			</div>
		{:else}
			<div class="w-12 h-12 bg-secondary bg-opacity-50 rounded-lg">
				<Logo />
			</div>
		{/if}
	</div>
</button>
