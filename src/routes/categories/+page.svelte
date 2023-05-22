<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Title from '$lib/components/Title.svelte';
	import type { PageData } from './$types';
	import Icon from '$lib/components/Icon.svelte';
	import { IconType } from '$lib/types/IconType';
	import { colors } from '$lib/util';

	export let data: PageData;
</script>

<div class="max-w-xl mx-auto pb-8 px-4">
	<div class="mt-4 md:mt-8 mb-4 w-full">
		<Title title={'My Categories'} />
	</div>

	<div class="w-full mt-4 flex flex-col items-center">
		{#if data.categories.length === 0}
			<div class="text-gray-500 text-center">You don't have any categories yet.</div>
		{:else}
			<div class="flex flex-col justify-center w-full gap-3">
				{#each data.categories as category}
					<div class="bg-neutral rounded-lg shadow-lg h-16 px-4 flex justify-between items-center">
						<div class="text-gray-800 font-bold text-xl">{category.name}</div>
						<div class="flex gap-8">
							<a href={'/categories/' + category.id} class=" w-20">
								<Button height="h-10" text="Edit" backgroundColor="secondary" textStyle="small" />
							</a>
							<Icon type={IconType.Drag} size="40" stroke={colors.primary} />
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
