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
	<div class="h-full w-full absolute grid grid-cols-3 gap-4 cursor-pointer z-10 gap-x-4">
		<button
		aria-label={$_('components.card.actions.reportAction')}
		class="h-20 mx-auto
			focus:outline-none"
		on:click={onReport}
	>
		<img src="/icons/actions/reportIcon.svg" alt={$_('components.card.actions.reportAlt')} />
	</button>
	<button
		aria-label={$_('components.card.actions.likeAction')}
		class="h-20 mx-auto
			w-full focus:outline-none w-10"
		on:click={onLike}
	>
		<img src="/icons/actions/likeIcon.svg" alt={$_('components.card.actions.likeAlt')} />
	</button>
	<button
		aria-label={$_('components.card.actions.replyAction')}
		class="h-10 mx-auto
			w-full focus:outline-none mt-3.5"
		on:click={onReply}
	>
		<img src="/icons/actions/replyIcon.svg" alt={$_('components.card.actions.replyAlt')} />
	</button>
	</div>
</div>