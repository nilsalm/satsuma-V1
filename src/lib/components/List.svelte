<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Invitation } from '$lib/models/Invitation';
	import type { List } from '$lib/models/List';
	import { pb } from '$lib/pocketbase';
	import { IconType } from '$lib/types/IconType';
	import { InvitationState } from '$lib/types/InvitationState';
	import { colors } from '$lib/util';
	import Icon from './Icon.svelte';

	export let list: List;
	export let invitation: Invitation | undefined;

	let isShared = list.owner !== pb.authStore.model?.id;
</script>

{#if (invitation && invitation.state !== InvitationState.Declined && isShared) || !isShared}
	<div
		class="hover:scale-103 duration-200 rounded-lg aspect-square relative {list.isTemplate
			? 'bg-secondary'
			: 'bg-primary'} shadow-lg"
	>
		{#if invitation && invitation.state === InvitationState.Pending}
			<div class="flex flex-col h-full">
				<div class="flex-grow">
					<div
						class="flex flex-col text-center h-full justify-center {list.isTemplate
							? 'text-darker'
							: 'text-neutral'}"
					>
						<p class="text-sm">Invitation to</p>

						<p class="font-semibold">
							{list.name}
						</p>

						<p class="text-sm">
							from {invitation.ownerName}
						</p>
					</div>
				</div>
				<form use:enhance class="h-1/3" method="POST">
					<input type="hidden" name="invitationId" value={invitation.id} />
					<div class="flex justify-center bg-neutral bg-opacity-50 h-full">
						<button
							class="flex-grow border-r-[1px] {list.isTemplate
								? 'border-secondary'
								: 'border-primary'} "
							formaction="?/acceptInvitation"
						>
							<div class="flex justify-around">
								<Icon
									type={IconType.Accept}
									size="20"
									stroke={list.isTemplate ? colors.darker : colors.neutral}
								/>
							</div>
						</button>
						<button class="flex-grow" formaction="?/declineInvitation">
							<div class="flex justify-around">
								<Icon
									type={IconType.Decline}
									size="20"
									stroke={list.isTemplate ? colors.darker : colors.neutral}
								/>
							</div>
						</button>
					</div>
				</form>
			</div>
		{:else}
			<a href={`/lists/${list.id}`} class="flex-grow">
				<div class="flex flex-col text-center h-full justify-center">
					<p class="font-semibold {list.isTemplate ? 'text-darker' : 'text-neutral'}">
						{list.name}
					</p>
				</div>
			</a>
			{#if invitation && invitation.state === InvitationState.Accepted && isShared}
				<div class="absolute top-1 right-2">
					<Icon type={IconType.Shared} size="25" stroke={colors.neutral} />
				</div>
			{/if}
		{/if}
	</div>
{/if}
