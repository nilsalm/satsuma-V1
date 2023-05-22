<script lang="ts">
	import type { Category } from '$lib/models/Category';
	import { IconType } from '$lib/types/IconType';
	import { colors } from '$lib/util';
	import Button from './Button.svelte';
	import Icon from './Icon.svelte';

	export let category: Category;
</script>

<div class="bg-neutral rounded-lg shadow-lg h-16 px-4 flex justify-between items-center">
	<div class="text-gray-800 font-bold text-xl">{category.name}</div>
	<div class="flex gap-8">
		<a href={'/categories/' + category.id} class=" w-20">
			<Button height="h-10" text="Edit" backgroundColor="secondary" textStyle="small" />
		</a>
		<Icon type={IconType.Drag} size="40" stroke={colors.primary} />
	</div>
</div>
