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

		<div class="flex my-auto">
			{#if $currentUser}
				<form
					method="POST"
					action="/logout"
					use:enhance={() => {
						return async ({ result }) => {
							pb.authStore.clear();
							await applyAction(result);
						};
					}}
				>
					<button class="hover:bg-secondary rounded py-1 px-2 m-1 hover:bg-opacity-40 text-sm"
						>Log out</button
					>
				</form>
			{:else}
				<NavButton href="/login" text="Log in" />
				<NavButton href="/register" text="Register" />
			{/if}
		</div>
	</div>
</div>
