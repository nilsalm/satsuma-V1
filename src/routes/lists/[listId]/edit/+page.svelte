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

	<div class="w-1/6">
		<Button text="Cancel" backgroundColor="secondary" textStyle="small" onClick={goBack} />
	</div>
</div>

<form action="?/updateList" method="POST">
	<div class="form-control gap-2 mb-4">
		<input
			type="text"
			name="name"
			placeholder="Name"
			value={data.list.name}
			class="input input-bordered"
		/>
		<label for="isTemplate">Is Template?</label>
		<input
			type="checkbox"
			name="isTemplate"
			checked={data.list.isTemplate}
			class="input input-bordered"
		/>
		<Button text="Update list" />

		<!-- TODO replace this button -->
		<button
			formaction="?/deleteList"
			class="bg-opacity-80 hover:bg-opacity-100 my-2 w-full rounded h-12 shadow-sm bg-red-500 text-white m-auto uppercase font-semibold text-md"
			>Delete list</button
		>
	</div>
</form>
