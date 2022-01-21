<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import { _ } from 'svelte-i18n';
	import Carousel from '$lib/Carousel/Carousel.svelte';
	import Empty from '$lib/Empty/Empty.svelte';
	import NewPost from '$lib/Layout/NewPost.svelte';
	import { globalFlashes, matchByDate, username } from '../../store';
	import party from 'party-js';
	let listOfFlashes = [];
	let categories = {};
	
	const updateCategoriesAndContent = async (list) => {
		let i = 0,
			len = list.length;
		while (i < len) {
			const flash = await globalFlashes.get(list[i]).then();			
			const today = new Date();
			const todaysMs = today.getTime();
			const minus3 = 3 * (60 * 60 * 1000);
			const newDateObj = new Date(todaysMs - minus3);

			if (flash && flash.when > newDateObj.toISOString()) {
				const flashTags = JSON.parse(flash.category);
				let e = 0;
				const post = {
					id: flash._["#"],
					when: flash.when,
					author: flash.author,
					likes: flash.stars,
					what: flash.content,
					tags: flashTags
				}
				while (e < flashTags.length) {
					if (!categories[flashTags[e]]) {
						categories[flashTags[e]] = [];
					}
					categories[flashTags[e]].push(post);
					categories[flashTags[e]] = categories[flashTags[e]].sort((a, b) => a.likes > b.likes);
					e++
				}	
				categories = categories;
			} else if (flash !== null && !(flash.when > newDateObj.toISOString())) {
				globalFlashes.get(list[i]).put(null);
			}
			i++;
		}
	}

	const removeCommon = (first, second) => {
		const spreaded = [...first, ...second];
		return spreaded.filter(el => {
			return !(first.includes(el) && second.includes(el));
		});
	}

	const onLike = (event) => {
		party.confetti(event.detail.button, {
		    count: party.variation.range(11, 20),
		    spread: party.variation.range(20, 30)
		});
	}

	const onReply = (event) => {
		const flashId = event.detail.id;
		goto('/chat/' + flashId);
	}

	const onReport = (event) => {
		debugger;
	}

	const onNewFlashes = async (data) => {
		const purgedList = Object.keys(data).slice(1, data.length);
		if (purgedList.length > listOfFlashes.length) {
			const diff = removeCommon(listOfFlashes, purgedList)
			await updateCategoriesAndContent(diff);
			listOfFlashes = purgedList;
		}
	}

	globalFlashes.on(onNewFlashes);
</script>

<svelte:head>
	<title>{$_('trending.title')} - Flashear</title>
</svelte:head>

<div class="overflow-y-auto w-full h-full">
	{#if Object.keys(categories).length > 0}
		{#each Object.keys(categories) as category}
			<Carousel title={category} items={categories[category]} on:like={onLike} on:reply={onReply} on:report={onReport} noActionFor={$username} />
		{/each}
	{:else}
		<Empty />
	{/if}
</div>

<NewPost />
