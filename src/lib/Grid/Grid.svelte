<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Card from '$lib/Card/Card.svelte';

	export let items = [], noActionFor;
	const ghosts = Array(7)
		.fill(null)
		.map((_, i) => i);
</script>

<div class="w-full flex gap-4 snap-x overflow-x-auto p-4 pb-8 mt-2">
	{#if items.length === 0}
		{#each ghosts as ghost}
			<div class="animate-pulse p-4 shadow-md border-2 border-gray-200 rounded-lg h-fit space-y-3 whitespace-pre-line" style="min-width: 15rem;">
				<div class="grid grid-cols-3 gap-4">
					<div class="h-2 bg-gray-300 rounded col-span-2" />
					<div class="h-2 bg-gray-300 rounded col-span-1" />
				</div>
				<div class="h-2 bg-gray-300 rounded" />
			</div>
		{/each}
	{/if}
	{#each items as flash}
		<Card on:like on:report on:reply id={flash.id} actions={noActionFor ? (noActionFor === flash.author ? false : true) : true}>
			<p>{@html flash.what.length > 177 ? flash.what.substring(0, 177) : flash.what}...</p>
		</Card>
	{/each}
</div>
