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
	let isNewPostDialogVisible = false;
	beforeNavigate(({ from, to }) => {
		if (to) path = to.pathname; // Triggers navigation transition
	});

	function handleLogout(event) {
		user.leave();
		username.set('');
	}

	function handleNewPost(event) {
		isNewPostDialogVisible = !isNewPostDialogVisible;
	}

</script>

{#if !$isLoading}
	<div class="app-container">
		<Navigation isLoggedIn={$username} on:logout={handleLogout} on:new={handleNewPost} />
		<RouteTransition referesh={path + $locale}>
			<slot />
		</RouteTransition>
	</div>
	<NewPost visible={isNewPostDialogVisible} />
{/if}

<style lang="postcss">
	.app-container {
		@apply flex flex-col md:flex-row bg-slate-100 dark:bg-zinc-900 h-screen;
	}
	@media (max-width: 768px) {
		.app-container {
			height: calc(100vh - 63px);
		}
	}
</style>