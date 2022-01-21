<script lang="ts">
	import { onMount } from 'svelte';
	import Typewriter from 'svelte-typewriter';
	import NewPost from '$lib/Layout/NewPost.svelte';
	import { _, json } from 'svelte-i18n';

	onMount(() => {
		window.scrollTo(0,1);
	})
</script>

<svelte:head>
	<title>{$_('home.title')} - Flashear</title>
</svelte:head>

<section class="p-8 h-40 text-center">
	<h1 class="text-2xl">{$_('home.typewriterTitle')}</h1>
	<div class="pl-3.5">
		<Typewriter loopRandom>
			{#each $json('home.typewriterList') as wordToType}
				<span class="text-2xl">{wordToType}</span>
			{/each}
		</Typewriter>
	</div>
</section>

<section class="p-8 h-40">
	<p class="text-xs text-gray-600">{$_('home.bottomMessage')}</p>
</section>

<NewPost />

<style global lang="postcss">
	@layer components {
	  .btn-blue {
	    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
	  }
	}
</style>