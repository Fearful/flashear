<script>
	import ChatMsg from './ChatMsg.svelte';
	import { onMount, createEventDispatcher } from 'svelte';
	import { username, user, db } from '../../store';
	import debounce from 'lodash.debounce';

	const dispatch = createEventDispatcher();

	let newMessage;
	export let messages = [];
	export let disabled = true;
	let scrollBottom;
	let lastScrollTop;
	let canAutoScroll = true;
	let unreadMessages = false;

	function autoScroll() {
		setTimeout(() => scrollBottom?.scrollIntoView({ behavior: 'auto' }), 50);
		unreadMessages = false;
	}

	function watchScroll(e) {
		canAutoScroll = (e.target.scrollTop || Infinity) > lastScrollTop;
		lastScrollTop = e.target.scrollTop;
	}

	$: debouncedWatchScroll = debounce(watchScroll, 1000);

	export async function sendMessage() {
		dispatch('sendMessage', {
			msg: newMessage
		});
		newMessage = '';
		return;
	}
</script>

<div class="min-h-screen bg-gray-100 p-8 w-fit">
	<main on:scroll={debouncedWatchScroll} class="max-w-4xl mx-auto space-y-12 grid grid-cols-1">
		{#each messages as message (message.when)}
			<ChatMsg {message} sender={$username} />
		{/each}

		<div class="dummy" bind:this={scrollBottom} />
	</main>

	<form on:submit|preventDefault={sendMessage}>
		<input
			type="text"
			placeholder="Escribe..."
			bind:value={newMessage}
			maxlength="100"
			{disabled}
		/>

		<button type="submit" disabled={!newMessage}>💥</button>
	</form>

	{#if !canAutoScroll}
		<div class="scroll-button">
			<button on:click={autoScroll} class:red={unreadMessages}>
				{#if unreadMessages}
					💬
				{/if}

				👇
			</button>
		</div>
	{/if}
</div>
