<script lang="ts">
	import { onMount } from 'svelte';
	import Typewriter from 'svelte-typewriter';
	import NewPost from '$lib/Layout/NewPost.svelte';
	import { _, json } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$_('home.title')} - Flashear</title>
</svelte:head>

<section class="common-padding text-center dark:text-white">
	<h1 class="text-2xl">{$_('home.typewriterTitle')}</h1>
	<div class="pl-3.5">
		<Typewriter loopRandom>
			{#each $json('home.typewriterList') as wordToType}
				<span class="text-2xl">{wordToType}</span>
			{/each}
		</Typewriter>
	</div>
</section>

<section class="common-padding">
	<p class="disclaimer-text">{$_('home.bottomMessage')}</p>
</section>

<NewPost />

<style lang="postcss">
	.common-padding {
		@apply p-8 h-40;
	}
	.disclaimer-text {
		@apply text-xs dark:text-backgroundDark-300;
	}
</style>