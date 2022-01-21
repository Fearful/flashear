<script lang="ts">
	import { goto } from '$app/navigation';
	import { _ } from 'svelte-i18n';
	import NewPost from '$lib/Layout/NewPost.svelte';
	import Grid from '$lib/Grid/Grid.svelte';
	import Empty from '$lib/Empty/Empty.svelte';
	import { username, globalFlashes } from '../../store';
	import party from 'party-js';
	let listOfFlashes = [];
	let flashs = [];

	const updateFlashesList = async (list) => {
		let i = 0,
			len = list.length;
		while (i < len) {
			const flash = await globalFlashes.get(list[i]).then();
			const today = new Date();
			const todaysMs = today.getTime();
			const minus3 = 3 * (60 * 60 * 1000);
			const newDateObj = new Date(todaysMs - minus3);

			if (flash && flash.when > newDateObj.toISOString()) {
				const post = {
					id: flash._["#"],
					when: flash.when,
					author: flash.author,
					likes: flash.stars,
					what: flash.content,
					when: flash.when,
					category: flash.category
				}
				flashs = [...flashs.slice(-100), post].sort((a, b) => a.likes > b.likes)
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

	const onReply = (event) => {
		const flashId = event.detail.id;
		goto('/chat/' + flashId);
	}

	const onLike = (event) => {
		party.confetti(event.detail.button, {
		    count: party.variation.range(11, 20),
		    spread: party.variation.range(20, 30)
		});
	}

	const onReport = (event) => {
		debugger;
	}

	const onNewFlashes = async (data) => {
		const purgedList = Object.keys(data).slice(1, data.length);
		if (purgedList.length > listOfFlashes.length) {
			const diff = removeCommon(listOfFlashes, purgedList)
			await updateFlashesList(diff);
			listOfFlashes = purgedList;
		}
	}

	globalFlashes.on(onNewFlashes);

</script>

<svelte:head>
	<title>{$_('all.title')} - Flashear</title>
</svelte:head>

{#if flashs.length  > 0}
	<Grid items={flashs} on:like={onLike} on:reply={onReply} on:report={onReport} noActionFor={$username} />
{:else}
	<Empty />
{/if}
<NewPost />