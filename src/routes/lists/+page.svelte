<script lang="ts">
	import { getPbClient } from '$lib/usePocketBase';
	import type { PageData } from './$types';
	import type { ShoppingList } from 'src/models/ShoppingList';
	import MdAdd from 'svelte-icons/md/MdAdd.svelte';
	import MyTitle from '../../components/MyTitle.svelte';
	import Toggle from '../../components/Toggle.svelte';

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

<MyTitle title={'My Lists'} />
<div class="h-14 flex flex-row items-center">
	{#if showModal === false}
		<div
			on:click={setShowModal}
			on:keydown={setShowModal}
			class="bg-pink border-2-purple rounded-lg w-10 h-10 my-auto text-purple shadow-md"
		>
			<MdAdd />
		</div>
	{:else}
		<div class="flex flex-row rounded-lg bg-pink text-black align-bottom shadow-md">
			<div class="p-2 my-auto">
				<input
					bind:value={newListName}
					class="rounded text-sm "
					type="text"
					placeholder="Name your list"
				/>
			</div>
			<div class=" my-auto pr-2">
				<Toggle bind:val={newListTemplate} label="Template" />
			</div>
			<div
				class="px-2 my-auto bg-mint font-semibold rounded shadow-md"
				on:click={addNewList}
				on:keydown={addNewList}
			>
				Add
			</div>
			<div class="px-2 my-auto font-semibold" on:click={setShowModal} on:keydown={setShowModal}>
				╳
			</div>
		</div>
	{/if}
</div>
<div class="grid grid-cols-3 md:grid-cols-6 gap-2">
	{#each myLists as list}
		<a
			href="/lists/{list.id}"
			class="rounded-xl w-24 h-24 text-center {list.template ? 'bg-purple' : 'bg-pink'}"
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
