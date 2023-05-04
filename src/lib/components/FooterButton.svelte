<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
	export let text: string;
	export let icon: string;

	$page.route.id;
</script>

<a
	class="text-sm hover:bg-secondary py-1 w-full h-full flex justify-center hover:bg-opacity-40
  {$page.route.id?.includes(href) ? 'bg-secondary bg-opacity-40' : ''}"
	{href}
>
	<div class="flex flex-col justify-center items-center">
		<div class="text-xl md:text-2xl">
			{icon}
		</div>
		<div class="text-white text-md md:text-lg">
			{text}
		</div>
	</div>
</a>
