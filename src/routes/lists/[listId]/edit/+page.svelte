<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Switch from '$lib/components/Switch.svelte';
	import Title from '$lib/components/Title.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { list } = data;

	let makeTemplate: boolean = list.isTemplate;
</script>

<div class="px-4">
	<div class="flex justify-between w-full mb-4">
		<Title title={'Edit List ' + list.name} />

		<a href={'/lists/' + list.id} class="w-20">
			<Button text="Cancel" backgroundColor="secondary" textStyle="small" />
		</a>
	</div>

	<form action="?/updateList" method="POST">
		<div class="flex flex-col gap-4">
			<input
				type="text"
				name="name"
				placeholder="Name"
				value={list.name}
				class="bg-neutral px-4 text-md text-gray-700 border-2 border-gray-700 font-semibold rounded h-12 shadow-sm"
			/>

			<Switch bind:value={makeTemplate} label="Make template?" name="isTemplate" />

			<Button text="Update list" />

			<!-- TODO replace this button -->
			<button
				formaction="?/deleteList"
				class="bg-opacity-80 hover:bg-opacity-100 my-2 w-full rounded h-12 shadow-sm bg-red-500 text-white m-auto uppercase font-semibold text-md"
				>Delete list</button
			>
		</div>
	</form>
</div>
