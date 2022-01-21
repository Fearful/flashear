<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Card from '$lib/Card/Card.svelte';
	import Ghost from '$lib/Ghost/Card.svelte';

	export let items = [], noActionFor, title = '';
	const backgrounds = [
		'bg-gradient-to-r from-green-200 via-green-400 to-purple-700',
		'bg-gradient-to-r from-green-300 via-yellow-300 to-pink-300',
		'bg-gradient-to-r from-gray-400 via-gray-600 to-blue-800',
		'bg-gradient-to-r from-purple-400 to-yellow-400',
		'bg-gradient-to-r from-red-800 via-yellow-600 to-yellow-500',
		'bg-gradient-to-r from-green-300 to-purple-400',
		'bg-gradient-to-r from-lime-600 via-yellow-300 to-red-600',
		'bg-gradient-to-r from-blue-500 to-yellow-100',
		'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500',
		'bg-gradient-to-r from-green-300 via-blue-500 to-purple-600',
		'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400'
	];

	const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];

	const ghosts = Array(7)
		.fill(null)
		.map((_, i) => i);
</script>

<section class="max-h-72">
	<div class={['p-1 h-12 ', randomBg].join('')}>
		<h3 class="text-xl pl-4 underline underline-offset-8 tracking-tight">{title}</h3>
	</div>
	<div class="w-full flex gap-4 snap-x overflow-x-auto p-4 pb-8 mt-2">
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
</section>