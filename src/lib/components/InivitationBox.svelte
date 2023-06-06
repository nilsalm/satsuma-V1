<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import type { Invitation } from '$lib/models/Invitation';
	import { acceptInvitationQuery } from '$lib/pocketbase';
	import { IconType } from '$lib/types/IconType';
	import { colors } from '$lib/util';

	export let invitation: Invitation;

  async function acceptInvite() {
    await acceptInvitationQuery(invitation);
    console.log("yooyo")
  }
  
  async function declineInvite() {
    console.log('decline invite');
  }
</script>

<div class="rounded-lg shadow-lg p-2 bg-slate-50">
	<div class="flex flex-wrap gap-2 text-xl justify-center text-primary">
		Invite to list
		<p class="font-semibold text-darker flex gap-1 items-center">
			<Icon stroke={colors.darker} size="24" type={IconType.List} />{invitation.listName}
		</p>
		from
		<p class="font-semibold text-darker flex gap-1 items-center">
			<Icon stroke={colors.darker} size="24" type={IconType.Profile} />{invitation.ownerName}
		</p>
	</div>

	<div class="flex justify-around mx-auto gap-4 md:gap-8 mt-4 max-w-xs">
		<Button onClick={acceptInvite} text="Accept" height="h-10" backgroundColor="accent" />
		<Button onClick={declineInvite} text="Decline" height="h-10" />
	</div>
</div>
