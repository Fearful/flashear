<script lang="ts">
	import '../../i18n';
	import { beforeNavigate, goto } from '$app/navigation';
	import { locale, isLoading, _ } from 'svelte-i18n';
	import { blur } from 'svelte/transition';
	import { user, username } from '../../store';
	import Navigation from '$lib/Layout/Navigation.svelte';
	import RouteTransition from '$lib/Layout/RouteTransition.svelte';
	import NewPost from '$lib/Layout/NewPost.svelte';
	import '../../app.css';

	let path = '';

	beforeNavigate(({ from, to }) => {
		if (to) path = to.pathname; // Triggers navigation transition
	});

	function goBack(defaultRoute = '/') {
	  const ref = document.referrer;
	  goto(ref.length > 0 ? ref : defaultRoute)
	}
</script>

{#if !$isLoading}
	<div class="chat-layout-container">
		<button
		aria-label={$_('new_post')}
		on:click={goBack}
		class="new-flash p-0 w-16 h-16 bg-accentColor-700 rounded-full hover:bg-accentColor-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
	>
		back
	</button>
		<RouteTransition referesh={path + $locale}>
			<slot />
		</RouteTransition>
	</div>
{/if}

<style lang="postcss">
	.chat-layout-container {
		@apply flex flex-col md:flex-row bg-slate-100 dark:bg-zinc-900 h-screen;
	}
</style>