<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { _ } from 'svelte-i18n';

	const dispatch = createEventDispatcher();
	const onLike = (event) => {
		dispatch('like', {
			id: event.path.find(p => p.id).id,
			button: event.target
		});
	};
	const onReport = (event) => {
		dispatch('report', {
			id: event.path.find(p => p.id).id
		});
	};
	const onReply = (event) => {
		dispatch('reply', {
			id: event.path.find(p => p.id).id
		});
	};
</script>

<div class="relative">
	<div class="action-container">
		<button
		aria-label={$_('components.card.actions.reportAction')}
		class="report-button"
		on:click={onReport}>
		<img src="/icons/actions/reportIcon.svg" alt={$_('components.card.actions.reportAlt')} />
	</button>
	<button
		aria-label={$_('components.card.actions.likeAction')}
		class="like-button"
		on:click={onLike}>
		<img src="/icons/actions/likeIcon.svg" alt={$_('components.card.actions.likeAlt')} />
	</button>
	<button
		aria-label={$_('components.card.actions.replyAction')}
		class="reply-button"
		on:click={onReply}>
		<img src="/icons/actions/replyIcon.svg" alt={$_('components.card.actions.replyAlt')} />
	</button>
	</div>
</div>

<style lang="postcss">
	.action-container {
		@apply h-full w-full absolute grid grid-cols-3 gap-4 cursor-pointer z-10 gap-x-4;
	}
	.report-button {
		@apply h-20 mx-auto focus:outline-none;
	}
	.like-button {
		@apply h-20 mx-auto focus:outline-none w-full w-10;
	}
	.reply-button {
		@apply h-10 w-full mt-3.5 mx-auto focus:outline-none;
	}
</style>