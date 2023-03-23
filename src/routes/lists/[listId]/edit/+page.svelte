<script lang="ts">
	import type { PageData } from './$types';
	import { getPbClient } from '$lib/usePocketBase';
	import MyTitle from '../../../../../src/components/MyTitle.svelte';
	import Toggle from '../../../../../src/components/Toggle.svelte';

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

<MyTitle title={`Edit list ${data.list.name || ''}`} />
<div class="border border-black rounded p-1 w-fit">
	<a href={`/lists/${data.list.id}`}>👈 Back</a>
</div>

<div class="flex flex-row gap-4 mt-4">
	<p class="font-semibold pl-2 ">Name</p>
	<input
		bind:value={listName}
		type="text"
		class="border rounded-md p-1 md:w-1/3 "
		placeholder="Name this list"
	/>
</div>
<!-- <div class="flex flex-row gap-4 mt-4">
	<p class="font-semibold pl-2 ">Template</p>
	<input bind:checked={listTemplate} type="checkbox" class="border rounded-md p-1 md:w-1/3 " />
</div> -->
<Toggle bind:val={listTemplate} label="Template" />
<div
	on:click={updateList}
	on:keydown={updateList}
	class=" rounded-md text-center bg-purple disabled:bg-pink disabled:text-light text-light font-semibold text-lg m-2 p-1 mt-8 md:w-1/3 "
>
	Update
</div>
{#if updateSuccess === true}
	<div>🎉</div>
{/if}

<!-- 
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
</div> -->
