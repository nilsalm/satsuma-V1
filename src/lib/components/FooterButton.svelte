<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
	export let icon: string;

	$page.route.id;

	let isActive = false;

	$: isActive = $page.route.id?.includes(href);
</script>

<div class="flex flex-col justify-center">
	<a
		class="text-sm hover:bg-darker p-1 rounded-lg my-2 duration-200 hover:bg-opacity-40
		{ isActive ? 'bg-darker bg-opacity-40' : ''}"
		{href}
	>
		<div class="text-2xl md:text-3xl">
			<img alt="Icon" src={icon} class="w-auto h-auto" />
		</div>
	</a>
</div>
