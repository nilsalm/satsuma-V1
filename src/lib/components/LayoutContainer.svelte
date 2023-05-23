<script lang="ts">
	export let withPadding: boolean = true;
</script>

<div class="max-w-xl mx-auto mt-4 md:mt-8 mb-8 {withPadding ? 'px-4': ''}">
	<slot />
</div>
