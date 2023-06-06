<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import LayoutContainer from '$lib/components/LayoutContainer.svelte';
	import SubTitle from '$lib/components/SubTitle.svelte';
	import Title from '$lib/components/Title.svelte';
	import { IconType } from '$lib/types/IconType';
	import { colors } from '$lib/util';
	import type { PageData } from './$types';

	export let data: PageData;

	$: invitations = data.invitations;
</script>

<LayoutContainer>
	<Title title="Invitations" />
	<div>
		{#if invitations.length === 0}
			<div>No invitations</div>
		{:else}
			<SubTitle text="Open invitation ({invitations.length})" />
			{#each invitations as invite}
				<div class="rounded-lg shadow-lg p-2 bg-slate-50">
					<div class="flex flex-wrap gap-2 text-xl justify-center text-primary">
						Invite to list
						<p class="font-semibold text-darker flex gap-1 items-center">
							<Icon stroke={colors.darker} size="24" type={IconType.List} />{invite.listName}
						</p>
						from
						<p class="font-semibold text-darker flex gap-1 items-center">
							<Icon size="24" type={IconType.Profile} />{invite.ownerName}
						</p>
					</div>

					<div class="flex justify-around mx-auto gap-4 md:gap-8 mt-4 max-w-xs">
						<Button text="Accept" height="h-10" backgroundColor="accent" />
						<Button text="Decline" height="h-10" />
					</div>
				</div>
			{/each}
		{/if}
	</div>
</LayoutContainer>
