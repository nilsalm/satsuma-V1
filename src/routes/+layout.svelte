<script>
	import '../app.postcss';
	import { currentUser, pb } from '$lib/pocketbase';
	import { applyAction, enhance } from '$app/forms';
</script>

<div class="bg-primary text-neutral h-12 sticky top-0 p-1">
	<div class="max-w-xl mx-auto flex justify-between">
		<a
			href={$currentUser ? '/lists' : '/'}
			class="hover:bg-secondary p-1 m-1 my-auto rounded hover:bg-opacity-40 text-xl">🍊</a
		>

		<ul class="flex my-auto">
			{#if $currentUser}
				<li class="hover:bg-secondary p-1 m-1 rounded hover:bg-opacity-40">
					<a class="text-sm" href="/lists">Lists</a>
				</li>
				<li class="hover:bg-secondary p-1 m-1 rounded hover:bg-opacity-40">
					<a class="text-sm" href="/profile">Profile</a>
				</li>
				<li class="hover:bg-secondary rounded p-1 m-1 hover:bg-opacity-40">
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
						<button class="text-sm">Log out</button>
					</form>
				</li>
			{:else}
				<li class="hover:bg-secondary p-1 m-1 rounded hover:bg-opacity-40">
					<a class="text-sm" href="/login">Log in</a>
				</li>
				<li class="hover:bg-secondary p-1 m-1 rounded hover:bg-opacity-40">
					<a class="text-sm" href="/register">Register</a>
				</li>
			{/if}
		</ul>
	</div>
</div>

<slot />
