<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Title from '$lib/components/Title.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	function goBack() {
		goto('/lists/' + data.list.id);
	}
</script>

<div class="flex justify-between w-full mb-4">
	<Title title={'Edit List ' + data.list.name} />

	<div class="w-20">
		<Button text="Cancel" backgroundColor="secondary" textStyle="small" onClick={goBack} />
	</div>
</div>

<form action="?/updateList" method="POST">
	<div class="flex flex-col gap-4">
		<input
			type="text"
			name="name"
			placeholder="Name"
			value={data.list.name}
			class="bg-neutral px-4 text-md text-gray-700 border-2 border-gray-700 font-semibold rounded h-12 shadow-sm"
		/>

		<label class="cursor-pointer label">
			<span class="label-text text-black text-lg">Make template?</span>
			<input
				checked={data.list.isTemplate}
				type="checkbox"
				name="isTemplate"
				class="appearance-none toggle toggle-primary"
			/>
		</label>

		<Button text="Update list" />

		<!-- TODO replace this button -->
		<button
			formaction="?/deleteList"
			class="bg-opacity-80 hover:bg-opacity-100 my-2 w-full rounded h-12 shadow-sm bg-red-500 text-white m-auto uppercase font-semibold text-md"
			>Delete list</button
		>
	</div>
</form>
