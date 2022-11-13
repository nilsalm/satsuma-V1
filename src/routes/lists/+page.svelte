<script lang="ts">
	import type { PageData } from './$types';
	import PocketBase from 'pocketbase';

	const client = new PocketBase('http://127.0.0.1:8090');

	export let data: PageData;

	let showModal = false;
	let newListName: string;
	let newListTemplate = false;

	function setShowModal() {
		showModal = !showModal;
	}
	async function addNewList() {
		const newList = {
			name: newListName,
			template: newListTemplate
		};
		const record = await client.records.create('shoppingLists', newList);
		showModal = false;
	}
</script>

<p>My Lists</p>
<div class="h-14 flex flex-row items-center">
	{#if showModal === false}
		<div
			on:click={setShowModal}
			on:keydown={setShowModal}
			class="bg-green-400 rounded-full w-8 h-8 my-auto text-center text-xl text-white font-bold"
		>
			+
		</div>
	{:else}
		<div class=" flex flex-row rounded-xl bg-green-400">
			<div class="p-2 my-auto">
				<input bind:value={newListName} class="rounded" type="text" placeholder="Name you list" />
			</div>
			<div class="flex flex-row my-auto">
				Template
				<input bind:checked={newListTemplate} class="mx-1" type="checkbox" />
			</div>
			<div class="px-2 my-auto " on:click={addNewList} on:keydown={addNewList}>Add</div>
			<div
				class="px-2 my-auto w-8 h-8 text-center text-xl text-white font-bold"
				on:click={setShowModal}
				on:keydown={setShowModal}
			>
				x
			</div>
		</div>
	{/if}
</div>
<div class="grid gap-2 justify-start">
	{#each data.lists as list}
		<a
			href="/lists/{list.id}"
			class="rounded-xl w-24 h-24 text-center {list.template ? 'bg-yellow-500' : 'bg-orange-500'}"
		>
			<div class="flex flex-col justify-center h-full break-words ">
				<div class="font-semibold">{list.name || 'List ' + list.id.substring(0, 3)}</div>
				{#if list.template === true}
					<div class="text-xs text-gray-100">Template</div>
				{/if}
			</div>
		</a>
	{/each}
</div>
