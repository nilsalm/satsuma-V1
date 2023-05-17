<script>
	import '../../app.postcss';
	import { currentUser, pb } from '$lib/pocketbase';
	import { applyAction, enhance } from '$app/forms';
	import NavButton from '$lib/components/NavButton.svelte';
	import Logo from './Logo.svelte';
</script>

<div class="bg-primary text-neutral h-12 w-full sticky top-0 p-1 z-10">
	<div class="max-w-xl mx-auto flex justify-between">
		<a
			href={$currentUser ? '/lists' : '/'}
			class="hover:bg-secondary p-1 m-1 my-auto rounded hover:bg-opacity-40 text-xl"
		>
			<div class="w-8 h-8">
				<Logo />
			</div></a
		>

		{#if !$currentUser}
			<div class="flex my-auto">
				<NavButton href="/login" text="Log in" />
				<NavButton href="/register" text="Register" />
			</div>
		{/if}
	</div>
</div>
