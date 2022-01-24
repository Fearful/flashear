<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Card from '$lib/Card/Card.svelte';
	import Ghost from '$lib/Ghost/Card.svelte';

	export let items = [], noActionFor;
	const ghosts = Array(7)
		.fill(null)
		.map((_, i) => i);
</script>

<div class="w-full flex gap-4 snap-x overflow-x-auto p-4 pb-8 mt-2 dark:text-slate-200">
	{#if items.length === 0}
		{#each ghosts as ghost}
			<Ghost />
		{/each}
	{/if}
	{#each items as flash}
		<Card on:like on:report on:reply id={flash.id} actions={noActionFor ? (noActionFor === flash.author ? false : true) : true}>
			<p>{@html flash.what.length > 177 ? flash.what.substring(0, 177) : flash.what}...</p>
		</Card>
	{/each}
</div>
