<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import NewPost from '$lib/Layout/NewPost.svelte';
	import Card from '$lib/Card/Card.svelte';
	import { localFlashes, globalFlashes, db, username } from '../../store';

	let listOfFlashes = [], listOfMyReplies = [], flashs = [], repliesData = [];

	const updateMyFlashes = async (list) => {
		let i = 0,
			len = list.length;
		while (i < len) {
			const flash = await globalFlashes.get(list[i]).then();
			let replies = await globalFlashes.get(list[i]).get('replies').then();
			const today = new Date();
			const todaysMs = today.getTime();
			const minus3 = 3 * (60 * 60 * 1000);
			const newDateObj = new Date(todaysMs - minus3);
			
			if (replies) {
				replies = await getRepliesData(replies, list[i]);
			}
			if (flash && flash.when > newDateObj.toISOString()) {
				const post = {
					when: flash.when,
					what: flash.content,
					who: flash.author,
					category: flash.category,
					replies: replies ? replies : []
				}
				flashs = [...flashs.slice(-100), post].sort((a, b) => a.when - b.when)
			}
			i++;
		}
	}

	const getRepliesData = async (replies, id) => {
		const purgedList = Object.keys(replies).slice(1, replies.length);
		let result = [];
		let i = 0,
			len = purgedList.length;
		while (i < len) {
			const reply = await globalFlashes.get(id).get('replies').get(purgedList[i]).get('chat').map();
			if (reply) {
				const post = {
					id: id + '-' + purgedList[i],
					what: reply.content,
					who: reply.author,
				}
				result = [...result.slice(-100), post].sort((a, b) => a.when - b.when)
			}
			i++;
		}
		return result;
	}

	const updateMyReplies = async (list) => {
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
					id: list[i],
					what: flash.content,
					who: flash.author
				}
				repliesData = [...repliesData.slice(-100), post].sort((a, b) => a.when - b.when)
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

	const onNewFlashes = async (data) => {
		const purgedList = Object.keys(data).slice(1, data.length);
		if (purgedList.length > listOfFlashes.length) {
			const diff = removeCommon(listOfFlashes, purgedList)
			await updateMyFlashes(diff);
			listOfFlashes = purgedList;
		}
	}

	localFlashes.on(onNewFlashes);
	db.user().get('myReplies').on(async (data) => {
		const purgedList = Object.keys(data).slice(1, data.length);
		if (purgedList.length > listOfMyReplies.length) {
			const diff = removeCommon(listOfMyReplies, purgedList)
			await updateMyReplies(diff);
			listOfMyReplies = purgedList;
		}
	})
</script>

<svelte:head>
	<title>{$_('my.title')} - Flashear</title>
</svelte:head>

<section class="overflow-hidden  p-4">
	<div class="grid grid-cols-1 xl:grid-cols-2 gap-4 items-center">
		<div class="h-full">
			<div>{$_('my.mine')}</div>
			{#each flashs as flash}
				<Card actions={false}>
					<p>{@html flash.what}</p>
					{#each flash.replies as reply}
						<a href={'/chat/' + reply.id} class="hover:no-underline my-2 block">
							<div class="rounded bg-gray-400 p-2">
								<p>{reply.what.substring(0, 80)}...</p>
							</div>
						</a>
					{/each}
				</Card>
			{/each}
		</div>
		<div class="h-full">
			<div>{$_('my.replies')}</div>
			{#each repliesData as originalPost}
				<Card actions={false}>
					<a href={'/chat/' + originalPost.id + '-' + $username} class="hover:no-underline my-2 block">
						<p>{@html originalPost.what}</p>
					</a>
				</Card>
			{/each}
		</div>
	</div>
</section>
<NewPost />