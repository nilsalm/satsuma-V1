<script>
	import '../app.css';
</script>

<div class="h-full">
	<nav class="h-16 p-4">
		<a href="/" class="text-xl p-4 m-1 bg-green-300 rounded">🏠</a>
		<a href="/lists" class="text-xl p-4 m-1 bg-green-300 rounded">📋</a>
		<a href="/profile" class="text-xl p-4 m-1 bg-green-300 rounded">🕺</a>
		<a href="/login" class="text-xl p-4 m-1 bg-green-300 rounded">🚪</a>
	</nav>

	<slot />
</div>
