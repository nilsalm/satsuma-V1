<script lang="ts">
	export let value: boolean = false;
	export let label: string = 'Toggle me';
	export let name: string = 'toggle';
</script>

<label class="relative inline-flex items-center cursor-pointer">
	<input type="checkbox" bind:checked={value} class="sr-only peer" {name} />
	<div
		class="w-11 h-6 bg-light peer-focus:outline-none ring-2 ring-gray-500 peer-focus:ring-gray-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
	/>
	<span class="ml-3 font-semibold text-gray-700">{label}</span>
</label>
