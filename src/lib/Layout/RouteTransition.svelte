<script lang="ts">
	import { onMount } from 'svelte';
	import { blur } from 'svelte/transition';
	export let referesh = '';
	let vh;
	onMount(() => {
		if(window.innerWidth < 768) {
			vh = window.innerHeight * 0.01;
		} else {
			vh = undefined;
		}
	})

</script>

{#key referesh}
	<main
		class="main-container"
		in:blur={{ duration: 300, delay: 100, amount: 5 }}
		out:blur={{ duration: 300 }}
		style={vh ? ['min-height:', (((vh * 100) - 63) + 'px')].join('') : ''}
	>
		<slot />
	</main>
{/key}

<style lang="postcss">
	.main-container {
		@apply w-screen h-full mb-24;
	}
	@media (min-width: 768px) {
		.main-container {
			width: calc(100vw - 80px);
		}
	}
</style>