<script lang="ts">
	export let list: {
		id: string;
		name: string;
		isTemplate: boolean;
	};
</script>

<a
	href={`/lists/${list.id}`}
	class="hover:scale-103 rounded-lg aspect-square relative {list.isTemplate
		? 'bg-secondary'
		: 'bg-primary'} shadow-lg"
>
	<div class="flex flex-col text-center h-full justify-center">
		<p
			class="font-semibold text-neutral {list.isTemplate
		? 'text-gray-500'
		: 'text-white'}"
		>
			{list.name}
		</p>
	</div>
</a>
