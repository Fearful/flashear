<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	export let isLoggedIn = false;
	let vh;
	onMount(() => {
		vh = window.innerHeight * 0.01;
	})

	const dispatch = createEventDispatcher();
	function logoutUser() {
		dispatch('logout');
	}
</script>

<nav class="nav-container" style={vh ? ['height:', (vh * 100 + 'px')].join('') : 'height:100vh'}>
	<ul>
		<li class="nav-buttons">
			<a href="/" class="nav-link nav-home">
				<img width="32" height="32" src="/icons/navigation/home.svg" alt={$_('alt_home')} />
			</a>
		</li>
		<li class="nav-buttons">
			<a href="/trending" class="nav-link nav-trending" >
				<img width="32" height="32" src="/icons/navigation/trending.svg" alt={$_('alt_trending')} />
			</a>
		</li>

		<li class="nav-buttons">
			<a href="/all" class="nav-link nav-all" >
				<img width="32" height="32" src="/icons/navigation/all.svg" alt={$_('alt_global')} />
			</a>
		</li>
		{#if isLoggedIn}
			<li class="nav-buttons">
				<a href="/my" class="nav-link nav-my" >
					<img width="32" height="32" src="/icons/navigation/chat.svg" alt={$_('alt_chat')} />
				</a>
			</li>
		{/if}
	</ul>

	<ul class="auth-buttons-container">
		{#if isLoggedIn}
			<li class="nav-buttons auth-buttons">
				<button class="nav-logout" aria-label={$_('logout_aria')} on:click={logoutUser}>
					<img width="24" height="24" src="/icons/navigation/logout.svg" alt={$_('alt_logout')} />
				</button>
			</li>
		{/if}
		{#if !isLoggedIn}
			<li class="nav-buttons auth-buttons">
				<a href="/auth" class="nav-login" >
					<img width="24" height="24" src="/icons/navigation/login.svg" alt={$_('alt_login')} />

				</a>
			</li>
		{/if}
	</ul>
</nav>

<style lang="postcss">
	.nav-container {
		@apply flex flex-col justify-between items-center bg-white dark:bg-backgroundDark-800;
		min-width: 80px;max-width: 80px;
	}
	.nav-link {
		@apply h-16 px-6 flex flex justify-center items-center w-full focus:text-accentColor-200;
	}
	.nav-buttons {
		@apply hover:bg-backgroundLight-100 dark:hover:bg-backgroundDark-700;
	}
	.auth-buttons-container {
		@apply mt-auto h-16 w-full flex justify-center items-center;
	}
	.auth-buttons {
		@apply w-max h-max;
	}
</style>