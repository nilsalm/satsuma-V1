<script lang="ts">
	import type { PageData } from './$types';
	import { getPbClient } from '$lib/usePocketBase';

	const pb = getPbClient();

	export let data: PageData;

	let listName = data.list.name;
	let listTemplate = data.list.template;
	let updateSuccess = false;
	let email = '';
	let emailSuccess = false;

	async function updateList() {
		const record = await pb.collection('shoppingLists').update(data.list.id, {
			name: listName,
			template: listTemplate
		});
		if (record) {
			updateSuccess = true;
		}
	}

	async function sendInvite() {
		alert('Sharing is coming soon');
	}
</script>

<div class="text-xl">Edit list</div>

<div class="bg-gray-100">
	<div>
		Name
		<input bind:value={listName} type="text" class="border rounded" placeholder="Name this list" />
	</div>
	<div>
		Template
		<input bind:checked={listTemplate} type="checkbox" />
	</div>
	<div on:click={updateList} on:keydown={updateList} class="bg-green-400 p-2 w-24 mx-auto">
		Update
	</div>
	{#if updateSuccess === true}
		<div>🎉</div>
	{/if}
</div>

<div class="bg-gray-200">
	<div>
		Invite to list
		<input bind:value={email} type="email" class="border rounded" placeholder="collaborator" />
	</div>
	<div on:click={sendInvite} on:keydown={sendInvite} class="bg-green-400 p-2 w-36 mx-auto">
		Invite friend to edit this list
	</div>
	{#if emailSuccess === true}
		<div>🎉</div>
	{/if}
</div>

<a href={`/lists/${data.list.id}`}>Back</a>
