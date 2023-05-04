<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Switch from '$lib/components/Switch.svelte';
	import Title from '$lib/components/Title.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { list } = data;

	let makeTemplate: boolean = list.isTemplate;
	let openModal: boolean = false;
	function closeModal() {
		openModal = false;
	}
</script>

<div class="px-4">
	<div class="flex justify-between w-full mb-4">
		<Title title={'Edit List ' + list.name} />

		<a href={'/lists/' + list.id} class="w-20">
			<Button text="Cancel" backgroundColor="secondary" textStyle="small" />
		</a>
	</div>

	<form action="?/updateList" method="POST">
		<div class="flex flex-col gap-4">
			<input
				type="text"
				name="name"
				placeholder="Name"
				value={list.name}
				class="bg-neutral px-4 text-md text-gray-700 border-2 border-gray-700 font-semibold rounded h-12 shadow-sm"
			/>

			<Switch bind:value={makeTemplate} label="Make template?" name="isTemplate" />

			<Button text="Update list" />
		</div>
	</form>
	<div class="my-2">
		<Button text="Delete list" backgroundColor="secondary" onClick={() => (openModal = true)} />
	</div>
</div>

{#if openModal}
	<div
		class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center"
	>
		<div class="bg-white rounded-lg shadow-lg p-4 mx-2">
			<div class="text-gray-800 font-bold text-xl">
				Are you sure you want to delete this list and all it's items?
			</div>
			<div class="flex justify-center mt-4">
				<form action="?/deleteList" method="POST" on:submit|preventDefault use:enhance>
					<input type="text" name="id" class="hidden" value={list.id} />
					<div class="flex justify-between gap-2">
						<div class="w-20">
							<Button text="Yes" />
						</div>
						<div class="w-20">
							<Button text="No" onClick={closeModal} />
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}
