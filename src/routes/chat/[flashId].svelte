<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { _ } from 'svelte-i18n';
	import Card from '$lib/Card/Card.svelte';
	import Chat from '$lib/Chat/Chat.svelte';
	import { db, user, username } from '../../store';
	// If user is loggedIn then go to home
	if (!user.is) goto('/auth');
	const flashId = $page.params.flashId;
	let messages = [];
	let firstReply = true;
	let flash = null;

	db.get('flashes')
		.get(flashId)
		.once(function (data, id) {
			if (!data) return;
			flash = {
				id: id,
				what: data.content,
				when: GUN.state.is(data, 'when')
			};
		});
	const test = db
		.get('flashes')
		.get(flashId)
		.get('replies')
		.get($username)
		.on((data, id) => {
			if (!data) return;
			goto('/chat/' + flashId + '-' + $username);
		});

	async function sendMsg(event) {
		const { msg } = event.detail;

		const mConfig = {
			replierPub: user.is.epub
		};
		const newMsg = {
			content: msg,
			author: $username
		};
		const index = new Date().toISOString();
		const chatRoom = db.get('flashes').get(flashId).get('replies').get($username).put(mConfig);
		db.user().get('myReplies').get(flashId).set(chatRoom);
		chatRoom.get('chat').get(index).put(newMsg);

		goto('/chat/' + flashId + '-' + $username);
	}
</script>

<svelte:head>
	<title>{$_('chat.title')} - Flashear</title>
</svelte:head>

<section class="overflow-hidden flex flex-col justify-items-stretch w-full h-full">
	{#if flash}
		<div class="mx-auto p-4">
			<Card>
				<p>{@html flash.what}</p>
			</Card>
		</div>
		<div class="mx-auto p-4">
			<Chat {messages} on:sendMessage={sendMsg} disabled={false} />
		</div>
	{/if}
</section>
