<script>
	import '../app.postcss';
	import { currentUser, pb } from '$lib/pocketbase';
	import { applyAction, enhance } from '$app/forms';
</script>

<div class="bg-primary text-neutral-content">
	<div class="max-w-xl mx-auto navbar">
		<div class="navbar-start">
			<a href="/" class="btn btn-ghost text-xl">HOME</a>
		</div>
		<div class="navbar-end">
			<ul class="menu menu-horizontal">
				{#if $currentUser}
					<!-- <li><a href="/">{$currentUser.email}</a></li> -->
					<li><a href="/lists">Lists</a></li>
					<li><a href="/profile">Profile</a></li>
					<li>
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
							<button>Log out</button>
						</form>
					</li>
				{:else}
					<li><a href="/login">Log in</a></li>
					<li><a href="/register">Register</a></li>
				{/if}
			</ul>
		</div>
	</div>
</div>
<div class="max-w-xl mx-auto py-8 px-4">
	<slot />
</div>
