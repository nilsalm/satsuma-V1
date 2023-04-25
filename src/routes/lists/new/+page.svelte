<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Title from '$lib/components/Title.svelte';

	function goBack() {
		goto('/lists/');
	}
</script>

<div class="flex justify-between w-full mb-4">
	<Title title={'Create new list'} />

	<div class="w-1/6">
		<Button text="Cancel" backgroundColor="secondary" textStyle="small" onClick={goBack} />
	</div>
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

		<Button text="Create list" />
	</div>
</form>
