<script lang="ts">
	import Actions from './Actions.svelte';

	export let actions = true;
	export let id ="";
	let showActions = false, clickTimer = null;
	const openActions = (event) =>{
		if (actions === true) showActions = true;
		if (typeof actions === 'function') actions(event);
	}
	const closeActions = () => {
		showActions = false;
	}
	const touchStart = (event) => {
		if (clickTimer == null) {
			clickTimer = setTimeout(function () {
				clickTimer = null;
			}, 500);
		} else {
			clearTimeout(clickTimer);
			clickTimer = null;
			openActions(event);
		}
	}
</script>

<div id={id} class="card-container" on:touchleave={closeActions} on:touchstart={touchStart} on:dblclick={openActions} on:mouseleave={closeActions} >
	{#if showActions}
		<Actions on:like on:report on:reply />
	{/if}
	<div class={showActions ? 'blur' : ''}>
		<slot />
	</div>
</div>

<style lang="postcss">
	.card-container {
		@apply p-4 shadow-md border-2 border-gray-200 rounded-lg h-fit space-y-3 whitespace-pre-line;
		min-width: 14em;
		max-width: 15em;
	}
</style>