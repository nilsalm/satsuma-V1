<script>
	import { resultList } from './+page';

	console.log(resultList);
</script>

<p>Load lists here</p>

<ul>
	<li><a href="/lists/12343">list</a></li>
	<li><a href="/lists/lksjhd">list</a></li>
</ul>

{#each resultList.items as list}
	<a href="/lists/{list.id}">list</a>
{/each}
