<script lang="ts">
	import Title from '$lib/components/Title.svelte';
</script>

<div class="flex justify-between max-w-lg align-bottom">
	<Title title={'Create new list'} />
	<a href="/lists" class="border border-gray-700 text-gray-700 rounded px-2 py-1 h-9">Cancel</a>
</div>

<form action="?/create" method="POST">
	<div class="form-control gap-2 mb-4">
		<input type="text" name="name" placeholder="Name" class="input input-bordered" />
		<label for="isTemplate">Is Template?</label>
		<input type="checkbox" name="isTemplate" class="input input-bordered" />

		<button class="btn btn-primary">Create list</button>
	</div>
</form>
