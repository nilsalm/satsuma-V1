<script lang="ts">
	export let list: {
		id: string;
		name: string;
		isTemplate: boolean;
	};
</script>

<a
	href={`/lists/${list.id}`}
	class="h-full rounded-lg {list.isTemplate ? 'bg-secondary' : 'bg-primary'}"
>
	<div class=" w-24 h-24 text-center m-4 flex flex-col justify-center">
		<p class="font-semibold text-neutral">{list.name}</p>
		{#if list.isTemplate === true}
			<p class="text-xs text-gray-500 font-light">Template</p>
		{/if}
	</div>
</a>
