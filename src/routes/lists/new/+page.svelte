<script lang="ts">
	import Title from '$lib/components/Title.svelte';
</script>

<Title title={'Create List'} />
<form action="?/create" method="POST">
	<div class="form-control gap-2 mb-4">
		<input type="text" name="name" placeholder="Name" class="input input-bordered" />
		<label for="isTemplate">Is Template?</label>
		<input type="checkbox" name="isTemplate" class="input input-bordered" />

		<button class="btn btn-primary">Create list</button>
	</div>
</form>
