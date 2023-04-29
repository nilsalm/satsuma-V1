<script lang="ts">
	const features = [
		{
			name: '🗒️ Templates',
			description:
				'Are you adding the same staples to you shopping list week after week? Add them to a template list instead and add the template to your shopping list in one click. Again and again. You can also use templates to save ingredient lists for your favorite recipes.'
		},
		{
			name: '🏷️ Categories',
			description:
				'Are you wandering back and forth in the supermarket because the things on your list are not grouped by section? Satsuma automatically groups all your items by category and you can of course make your own categories and order them as you like.'
		},
		{
			name: '👯 Sharing',
			description:
				'Are frustrated with how hard it can be to invite your partner to share the same list? Relax, have a satsuma and enjoy the next trip to the supermarket.'
		}
	];
</script>

<div class="bg-neutral py-24 sm:py-32">
	<div class="max-w-xl mx-auto py-8 px-4">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-2xl lg:text-center">
				<h2 class="text-base font-semibold leading-7 text-primary">Shop faster</h2>
				<p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
					Everything you need to make your shopping trip a breeze
				</p>
			</div>
			<div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
				<div class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
					{#each features as feature}
						<div class="flex flex-col">
							<div
								class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900"
							>
								{feature.name}
							</div>
							<div class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
								<p class="flex-auto">{feature.description}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
