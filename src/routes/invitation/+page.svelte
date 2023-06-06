<script lang="ts">
	import InivitationBox from '$lib/components/InivitationBox.svelte';
	import LayoutContainer from '$lib/components/LayoutContainer.svelte';
	import SubTitle from '$lib/components/SubTitle.svelte';
	import Title from '$lib/components/Title.svelte';
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
				<InivitationBox invitation={invite} />
			{/each}
		{/if}
	</div>
</LayoutContainer>
