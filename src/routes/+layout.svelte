<script>
	import '../app.postcss';
	import { currentUser, pb } from '$lib/pocketbase';
	import { applyAction, enhance } from '$app/forms';
	import NavButton from '$lib/components/NavButton.svelte';
</script>

<div class="bg-primary text-neutral h-12 sticky top-0 p-1">
	<div class="max-w-xl mx-auto flex justify-between">
		<a
			href={$currentUser ? '/lists' : '/'}
			class="hover:bg-secondary p-1 m-1 my-auto rounded hover:bg-opacity-40 text-xl">🍊</a
		>

		<div class="flex my-auto">
			{#if $currentUser}
				<NavButton href="/lists" text="Lists" />
				<NavButton href="/profile" text="Profile" />

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

<slot />
