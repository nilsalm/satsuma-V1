<script lang="ts">
	import Title from '$lib/components/Title.svelte';
</script>

<form action="?/create" method="POST">
	<Title title={'Create List'} />
	<h1 class="text-2xl mb-8">Create List</h1>
	<div class="form-control gap-2 mb-4">
		<input type="text" name="name" placeholder="Name" class="input input-bordered" />
		<label for="isTemplate">Is Template?</label>
		<input type="checkbox" name="isTemplate" class="input input-bordered" />

		<button class="btn btn-primary">Create list</button>
	</div>
</form>
