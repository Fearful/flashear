<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { _ } from 'svelte-i18n';
	import Card from '$lib/Card/Card.svelte';
	import Chat from '$lib/Chat/Chat.svelte';
	import { db, user, username as currentUser, chatMessages } from '../../store';
	// If user is not logged in, redirect to auth
	if (!user.is) goto('/auth');
	// Extract flashId and username from URL params
	const { flashId, username } = $page.params;

	const ids = [];
	let messages = [],
		originalFlash = null,
		disableChat = true,
		replierPub,
		encryptedChatKeys,
		authorPub,
		chatStore;

	// Sort messages by datetime
	function sortByDate(a, b) {
		return new Date(b.when) > new Date(a.when);
	}

	// Add messages to the list
	function addToMessages(msg, id) {
		const idExists = ids.findIndex((someId) => someId === id) !== -1;
		if (!idExists) {
			ids.push(id);
			messages.push(msg);
			messages = messages.sort(sortByDate);
			if (msg.who === $currentUser) {
				disableChat = true;
			} else {
				disableChat = false;
			}
		}
	}

	onMount(async () => {
		// Get original flash or 'post'
		const originFlash = db.get('flashes').get(flashId);
		await originFlash.once(function (data, id) {
			if (!data) return;
			originalFlash = data;
		});
		// Get specific replies with user, a.k.a. single conversation thread
		const repliesWithUser = originFlash.get('replies').get(username);
		await repliesWithUser.once(function (data, id) {
			if (!data) return;
			encryptedChatKeys = data.encryptedChatKeys;
			replierPub = data.replierPub;
			authorPub = data.authorPub;
		});

		// Get chat store setup and subscribe to decode messages
		const chatRef = repliesWithUser.get('chat');
		chatStore = chatMessages(chatRef);
		chatStore.subscribe(async (chatMsgs) => {
			// Get an array of the id's (timestamps) of each chatMsg
			const chatKeys = Object.keys(chatMsgs);
			const amountOfMsgs = chatKeys.length;
			if (amountOfMsgs === 0) return;

			const isTheUserTheAuthor = $currentUser === originalFlash.author;

			const userToLookUp = isTheUserTheAuthor ? username : originalFlash.author;
			let keys = JSON.parse(
				sessionStorage.getItem(userToLookUp) === 'undefined'
					? null
					: sessionStorage.getItem(userToLookUp)
			);

			if (!keys) {
				if (!encryptedChatKeys) {
					// Author hasn't replied to this chat
					const message = {
						who: chatMsgs[chatKeys[0]].author,
						what: chatMsgs[chatKeys[0]].content,
						when: chatKeys[0]
					};

					addToMessages(message, chatKeys[0]);
					return;
				}
				// Get our keys for the chat based on the encryptedChatKeys
				const myPairOfKeys = JSON.parse(sessionStorage.getItem('pair')); // we use our keys
				const decryptedChatKeys = await SEA.decrypt(
					encryptedChatKeys,
					await SEA.secret(authorPub, myPairOfKeys) // plus the authorPub
				);
				sessionStorage.setItem(userToLookUp, JSON.stringify(decryptedChatKeys));
				keys = decryptedChatKeys;
			}
			for (let i = 0; i < amountOfMsgs; ++i) {
				const msg = chatMsgs[chatKeys[i]];
				if (msg.content.startsWith('SEA{')) {
					// Encrypted Message from chat
					const msgverified = await SEA.verify(msg.content, keys.pub);
					const decryptedContent = (await SEA.decrypt(msgverified, keys)) + '';

					const message = {
						who: msg.author,
						what: decryptedContent,
						when: chatKeys[i]
					};
					addToMessages(message, chatKeys[i]);
				} else {
					// No encryption necessary (usually the first message only)
					const message = {
						who: msg.author,
						what: msg.content,
						when: chatKeys[i]
					};
					addToMessages(message, chatKeys[i]);
				}
			}
			// 0: {who: 'test1', what: 'ejfierjfie', when: '2022-01-15T12:45:22.547Z'}
		});
	});

	async function sendMessage(event) {
		const { msg } = event.detail;
		const replies = db.get('flashes').get(flashId).get('replies').get(username);

		const userToLookUp = $currentUser === originalFlash.author ? username : originalFlash.author;
		let currentChatKeys = JSON.parse(
			sessionStorage.getItem(userToLookUp) === 'undefined'
				? null
				: sessionStorage.getItem(userToLookUp)
		);
		if (!encryptedChatKeys) {
			// We don't have the keys for encrypting messages
			if ($currentUser !== originalFlash.author) {
				// If the replier for some reason forces an update, send message without encryption, re initiate config and return
				const mConfig = {
					o: user.is.epub
				};
				replies.put(mConfig);
				disableChat = true;
				chatStore.add(msg);
				return;
			}
			// Generate new keys for chat
			currentChatKeys = await SEA.pair();
			sessionStorage.setItem(username, JSON.stringify(currentChatKeys));

			// Use the replierPub and our keys and encrypt a message so only the replier can read
			const myPairOfKeys = JSON.parse(sessionStorage.getItem('pair'));
			const encryptedMessageKeys = await SEA.encrypt(
				currentChatKeys,
				await SEA.secret(replierPub, myPairOfKeys)
			);

			replies.get('authorPub').put(user.is.epub);
			replies.get('encryptedChatKeys').put(encryptedMessageKeys);
		}
		// Use keys to encrypt our message and sign them
		const encryptedMessage = await SEA.encrypt(msg, currentChatKeys);
		const newMessage = await SEA.sign(encryptedMessage, currentChatKeys);

		disableChat = true;
		chatStore.add(newMessage);
	}
</script>

<svelte:head>
	<title>{$_('chat.title')} - Flashear</title>
</svelte:head>

{#if originalFlash !== null}
	<div class="place-self-end text-center">
		<div class="p-5 rounded-2xl bg-white rounded-tl-none">
			<p class="inline pl-2">{@html originalFlash.content}</p>
		</div>
	</div>
{/if}

{#if messages.length > 0}
	<Chat {messages} on:sendMessage={sendMessage} disabled={disableChat} />
{/if}
