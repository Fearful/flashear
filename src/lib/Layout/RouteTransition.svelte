<script lang="ts">
	import { onMount } from 'svelte';
	import { blur } from 'svelte/transition';
	export let referesh = '';
	let vh;
	onMount(() => {
		vh = window.innerHeight * 0.01;
	})

</script>

{#key referesh}
	<div
		class="w-full"
		style={vh ? ['height:', (vh * 100 + 'px')].join('') : 'height:100vh'}
		in:blur={{ duration: 300, delay: 100, amount: 5 }}
		out:blur={{ duration: 300 }}
	>
		<slot />
	</div>
{/key}
