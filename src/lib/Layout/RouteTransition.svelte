<script lang="ts">
	import { blur } from 'svelte/transition';
	export let referesh = '';
</script>

{#key referesh}
	<div
		class="h-screen w-full"
		in:blur={{ duration: 300, delay: 100, amount: 5 }}
		out:blur={{ duration: 300 }}
	>
		<slot />
	</div>
{/key}
