<script lang="ts">
	import { page } from '$app/stores';
	import type { IconType } from '$lib/types/IconType';
	import Icon from '$lib/components/Icon.svelte';
	import { colors } from '$lib/util';

	export let href: string;
	export let icon: IconType;

	$page.route.id;

	let isActive = false;

	$: isActive = $page.route.id?.includes(href) || false;
</script>

<div class="flex flex-col justify-center">
	<a
		class="text-sm hover:bg-darker p-1 rounded-lg my-2 duration-200 hover:bg-opacity-40
		{isActive ? 'bg-darker bg-opacity-40' : ''}"
		{href}
	>
		<Icon type={icon} size="32" stroke={colors.neutral} />
	</a>
</div>
