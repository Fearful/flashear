<script lang="ts">
	import '../i18n';
	import { beforeNavigate } from '$app/navigation';
	import { locale, isLoading } from 'svelte-i18n';
	import { blur } from 'svelte/transition';
	import { user, username } from '../store';
	import Navigation from '$lib/Layout/Navigation.svelte';
	import RouteTransition from '$lib/Layout/RouteTransition.svelte';
	import NewPost from '$lib/Layout/NewPost.svelte';
	import '../app.css';

	let path = '';
	beforeNavigate(({ from, to }) => {
		if (to) path = to.pathname; // Triggers navigation transition
	});

	function handleLogout(event) {
		user.leave();
		username.set('');
	}
</script>
{#if !$isLoading}
	<div class="flex bg-slate-100 dark:bg-zinc-900">
		<Navigation isLoggedIn={$username} on:logout={handleLogout} />
		<main class="flex flex-col justify-between" style="width: calc(100vw - 80px);">
			<RouteTransition referesh={path + $locale}>
				<slot />
			</RouteTransition>
		</main>
	</div>
{/if}

{#if (path !== '/auth' && path !== '/chat')}
	<NewPost />
{/if}