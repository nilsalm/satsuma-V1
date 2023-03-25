<script lang="ts">
	export let list: {
		id: string;
		name: string;
		isTemplate: boolean;
	};
</script>

<div class="rounded-xl w-24 h-24 text-center m-4">
	<a
		href={`/lists/${list.id}`}
		class="btn h-full {list.isTemplate ? 'btn-secondary' : 'btn-primary'}"
	>
		<p class="font-semibold">{list.name}</p>
		{#if list.isTemplate === true}
			<p class="text-xs text-gray-500 font-light">Template</p>
		{/if}
	</a>
</div>
