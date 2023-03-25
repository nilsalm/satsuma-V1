<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<form action="?/updateList" method="POST">
	<Title title={'Edit List ' + data.list.name} />
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
		<button class="btn btn-primary">Update list</button>
		<button formaction="?/deleteList" class="btn bg-color-red-500 text-white">Delete list</button>
	</div>
</form>
