<script lang="ts">
	import Title from '$lib/components/Title.svelte';
</script>

<div class="flex justify-between max-w-lg align-bottom">
	<Title title={'Create new list'} />
</div>

<form action="?/create" method="POST">
	<div class="form-control gap-2 mb-4 mt-8">
		<input
			type="text"
			name="name"
			placeholder="List name"
			class="input input-bordered text-black"
		/>

		<label class="cursor-pointer label">
			<span class="label-text text-black text-lg">Make template?</span>
			<input type="checkbox" name="isTemplate" class="appearance-none toggle toggle-primary" />
		</label>

		<button class="btn btn-primary mt-6">Create list</button>
		<a href="/lists" class="btn btn-secondary btn-outline">Cancel</a>
	</div>
</form>
