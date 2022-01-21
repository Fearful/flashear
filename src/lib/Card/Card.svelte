<script lang="ts">
	import Actions from './Actions.svelte';

	export let actions = true;
	export let id ="";
	let showActions = false, clickTimer = null;
	const callActions = (event) =>{
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
			callActions(event);
		}
	}
	const touchLeave = () => {
		closeActions();
	}
</script>

<div class="p-4 shadow-md border-2 border-gray-200 rounded-lg h-fit space-y-3 whitespace-pre-line" style="min-width: 14em;max-width: 15em;" on:touchleave={touchLeave}
	on:touchstart={touchStart}
	on:dblclick={callActions}
	on:mouseleave={closeActions}
	id={id}>
	{#if showActions}
		<Actions on:like on:report on:reply />
	{/if}
	<div class={showActions ? 'blur' : ''}>
		<slot />
	</div>
</div>