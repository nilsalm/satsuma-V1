<script>
	import '../app.postcss';
	import { currentUser, pb } from '$lib/pocketbase';
	import { applyAction, enhance } from '$app/forms';
</script>

<div class="bg-primary text-neutral h-16">
	<div class="max-w-xl mx-auto flex justify-between">
		<div class="hover:bg-secondary p-2 m-2 rounded hover:bg-opacity-40">
			<a href="/" class=" text-xl">HOME</a>
		</div>
		<div class="">
			<ul class="flex">
				{#if $currentUser}
					<li class="hover:bg-secondary p-2 m-2 rounded hover:bg-opacity-40">
						<a class=" text-lg" href="/lists">Lists</a>
					</li>
					<li class="hover:bg-secondary p-2 m-2 rounded hover:bg-opacity-40">
						<a class=" text-lg" href="/profile">Profile</a>
					</li>
					<li class="hover:bg-secondary rounded p-2 m-2 hover:bg-opacity-40">
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
							<button class="text-lg">Log out</button>
						</form>
					</li>
				{:else}
					<li class="hover:bg-secondary p-2 m-2 rounded hover:bg-opacity-40">
						<a class=" text-lg" href="/login">Log in</a>
					</li>
					<li class="hover:bg-secondary p-2 m-2 rounded hover:bg-opacity-40">
						<a class=" text-lg" href="/register">Register</a>
					</li>
				{/if}
			</ul>
		</div>
	</div>
</div>

<div class="max-w-xl mx-auto py-8 px-4">
	<slot />
</div>
