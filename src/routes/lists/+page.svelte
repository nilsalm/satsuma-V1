<script lang="ts">
	import { getPbClient } from '$lib/usePocketBase';
	import type { PageData } from './$types';
	import type { ShoppingList } from 'src/models/ShoppingList';
	import MdClose from 'svelte-icons/md/MdClose.svelte';
	import MdAddCircleOutline from 'svelte-icons/md/MdAddCircleOutline.svelte';
	import MdAdd from 'svelte-icons/md/MdAdd.svelte';

	const pb = getPbClient();

	export let data: PageData;
	$: myLists = [...data.lists];

	let showModal = false;
	let newListName: string;
	let newListTemplate = false;

	function setShowModal() {
		showModal = !showModal;
	}
	async function addNewList() {
		const newList = {
			name: newListName,
			template: newListTemplate,
			owner: pb.authStore.model?.id
		};
		const record = await pb.collection('shoppingLists').create(newList);

		newListName = '';
		newListTemplate = false;
		showModal = false;

		const newListCreated: ShoppingList = {
			id: record.id,
			name: record.name || '',
			template: record.template || false,
			owner: record.owner
		};

		myLists = [...myLists, newListCreated];
	}
</script>

<p>My Lists</p>
<div class="h-14 flex flex-row items-center">
	{#if showModal === false}
		<div
			on:click={setShowModal}
			on:keydown={setShowModal}
			class="bg-green-400 rounded-full w-10 h-10 my-auto text-white "
		>
			<MdAdd />
		</div>
	{:else}
		<div class=" flex flex-row rounded-md bg-green-400">
			<div class="p-2 my-auto">
				<input
					bind:value={newListName}
					class="rounded text-sm"
					type="text"
					placeholder="Name you list"
				/>
			</div>
			<div class="flex flex-row my-auto">
				Template
				<input bind:checked={newListTemplate} class="mx-1" type="checkbox" />
			</div>
			<div class="px-2 w-10 h-10 text-white" on:click={addNewList} on:keydown={addNewList}>
				<MdAddCircleOutline />
			</div>
			<div class="px-2 w-10 h-10 text-white" on:click={setShowModal} on:keydown={setShowModal}>
				<MdClose />
			</div>
		</div>
	{/if}
</div>
<div class="grid grid-flow-row-dense md:grid-cols-6 grid-cols-3 gap-4 ">
	{#each myLists as list}
		<a
			href="/lists/{list.id}"
			class="rounded-xl w-24 h-24 text-center {list.template ? 'bg-yellow-500' : 'bg-orange-500'}"
		>
			<div class="flex flex-col justify-center h-full break-words ">
				<div class="font-semibold">{list.name || 'List ' + list.id.substring(0, 3)}</div>
				{#if list.template === true}
					<div class="text-xs text-gray-100 font-light">Template</div>
				{/if}
			</div>
		</a>
	{/each}
</div>
