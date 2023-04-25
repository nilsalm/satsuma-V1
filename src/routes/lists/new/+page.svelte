<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Switch from '$lib/components/Switch.svelte';
	import Title from '$lib/components/Title.svelte';

	$: makeTemplate = false;
</script>

<div class="flex justify-between w-full mb-4">
	<Title title={'Create new list'} />

	<a href="/lists" class="w-20">
		<Button text="Cancel" backgroundColor="secondary" textStyle="small" />
	</a>
</div>

<form action="?/create" method="POST">
	<div class="flex flex-col gap-4">
		<input
			type="text"
			name="name"
			placeholder="List name"
			class="bg-neutral px-4 text-md text-gray-700 border-2 border-gray-700 font-semibold rounded h-12 shadow-sm"
		/>

		<Switch bind:value={makeTemplate} label="Make template?" name="isTemplate" />

		<Button text="Create list" />
	</div>
</form>
