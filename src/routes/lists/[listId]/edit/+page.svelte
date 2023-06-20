<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import SubTitle from '$lib/components/SubTitle.svelte';
	import Switch from '$lib/components/Switch.svelte';
	import Title from '$lib/components/Title.svelte';
	import { IconType } from '$lib/types/IconType';
	import { colors } from '$lib/util';
	import type { ActionData, PageData } from './$types';
	import { currentUser } from '$lib/pocketbase';

	export let data: PageData;
	export let form: ActionData;
	const { list } = data;

	let makeTemplate: boolean = list.isTemplate;
	let openModal: boolean = false;
	function closeModal() {
		openModal = false;
	}
	const user = $currentUser;
</script>

<div class="flex justify-between w-full mb-4">
	<Title title={'Edit List ' + list.name} />

	<a href={'/lists/' + list.id} class="w-20">
		<Button text="Cancel" backgroundColor="secondary" textStyle="small" />
	</a>
</div>
<div class="flex flex-col gap-8">
	{#if list.owner === user?.id}
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

				{#if form?.message && form?.type === 'update'}
					<div class="text-red-400 text-center">{form.message}</div>
				{:else if form?.success && form?.type === 'update'}
					<div class="text-green-400 text-center">List updated.</div>
				{/if}
			</div>
		</form>

		<Divider />

		<div class="flex flex-col gap-2">
			<form action="?/inviteUser" method="POST" use:enhance>
				<div class="flex flex-col gap-4">
					<input
						type="text"
						name="usernameEmail"
						placeholder="Username or Email"
						class="bg-neutral px-4 text-md text-gray-700 border-2 border-gray-700 font-semibold rounded h-12 shadow-sm"
					/>

					<Button text="Invite User" />

					{#if form?.message && form?.type === 'invitation'}
						<div class="text-red-400 text-center">{form.message}</div>
					{:else if form?.success && form?.type === 'invitation'}
						<div class="text-green-400 text-center">
							Invitation sent to your friend <strong>{form?.guest}</strong>.
						</div>
					{/if}
				</div>
			</form>

			{#if data.guests.length > 0}
				<SubTitle title="Shared with" />
				{#each data.guests as guest}
					<form action="?/removeGuest" method="POST" use:enhance>
						<div class="flex flex-col gap-4">
							<input type="text" name="guest" class="hidden" value={guest.id} />

							<div class="flex justify-between items-center">
								<div class="text-md text-gray-700 font-semibold">{guest.username}</div>
								<div class="w-10">
									<button type="submit" class="">
										<Icon type={IconType.Decline} stroke={colors.darker} />
									</button>
								</div>
							</div>

							{#if form?.message && form?.type === 'removeGuest'}
								<div class="text-red-400 text-center">{form.message}</div>
							{:else if form?.success && form?.type === 'removeGuest'}
								<div class="text-green-400 text-center">
									Removed <strong>{guest.username}</strong> from the list.
								</div>
							{/if}
						</div>
					</form>
				{/each}
			{/if}
		</div>

		<Divider />

		<Button text="Delete list" backgroundColor="secondary" onClick={() => (openModal = true)} />
	{:else}
		<form action="?/unfollowList" method="POST">
			<Button text="Unfollow List" />
			{#if form?.message && form?.type === 'unfollow'}
				<div class="text-red-400 text-center">{form.message}</div>
			{:else if form?.success && form?.type === 'unfollow'}
				<div class="text-green-400 text-center">You are no longer following this list.</div>
			{/if}
		</form>
	{/if}
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
