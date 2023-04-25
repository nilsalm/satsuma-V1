<script lang="ts">
	export let text = 'Click me';
	export let onClick = () => {};
	export let backgroundColor: 'primary' | 'secondary' | 'neutral' | 'accent' = 'primary';
	export let bordered = false;
	export let textStyle: 'big' | 'small' = 'big';
	export let disabled = false;
	export let shadow = true;
</script>

<button
	class={`bg-${backgroundColor} bg-opacity-80 hover:bg-opacity-100 my-2 w-full rounded h-12 shadow-sm ${
		bordered ? 'border-2 border-gray-700' : ''
	} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${shadow ? 'shadow-lg' : ''}}`}
	on:click={onClick}
	on:keydown={onClick}
>
	<p
		class={`m-auto text-gray-700 text-md ${
			textStyle === 'big' ? 'uppercase font-semibold' : 'font-normal'
		}`}
	>
		{text}
	</p>
</button>
