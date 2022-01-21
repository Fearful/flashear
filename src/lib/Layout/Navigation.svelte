<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { _ } from 'svelte-i18n';

	export let isLoggedIn = false;
	const dispatch = createEventDispatcher();
	function logoutUser() {
		dispatch('logout');
	}
</script>

<nav class="flex flex-col justify-between h-screen items-center bg-white" style="min-width: 80px;max-width: 80px;">
	<!-- Side Nav Bar-->

	<ul>
		<li class="hover:bg-gray-100">
			<a
				href="/"
				class="h-16 px-6 flex flex justify-center items-center w-full focus:text-orange-500 nav-home"
			>
				<img width="32" height="32" src="/icons/navigation/home.svg" alt={$_('alt_home')} />
			</a>
		</li>
		<li class="hover:bg-gray-100">
			<a
				href="/trending"
				class="h-16 px-6 flex flex justify-center items-center w-full focus:text-orange-500 nav-trending"
			>
				<img width="32" height="32" src="/icons/navigation/trending.svg" alt={$_('alt_trending')} />
			</a>
		</li>

		<li class="hover:bg-gray-100">
			<a
				href="/all"
				class="h-16 px-6 flex flex justify-center items-center w-full focus:text-orange-500 nav-all"
			>
				<img width="32" height="32" src="/icons/navigation/all.svg" alt={$_('alt_global')} />
			</a>
		</li>
		{#if isLoggedIn}
			<li class="hover:bg-gray-100">
				<a
					href="/my"
					class="h-16 px-6 flex flex justify-center items-center w-full focus:text-orange-500 nav-my"
				>
					<img width="32" height="32" src="/icons/navigation/chat.svg" alt={$_('alt_chat')} />
				</a>
			</li>
		{/if}
	</ul>

	<ul class="mt-auto h-16 w-full flex justify-center items-center">
		{#if isLoggedIn}
			<li class="hover:bg-gray-100 w-max h-max">
				<button
				class="nav-logout"
				aria-label={$_('logout_aria')}
				on:click={logoutUser}>
					<img width="24" height="24" src="/icons/navigation/logout.svg" alt={$_('alt_logout')} />
				</button>
			</li>
		{/if}
		{#if !isLoggedIn}
			<li class="hover:bg-gray-100 w-max h-max">
				<a
				href="/auth"
				class="nav-login"
				>
					<img width="24" height="24" src="/icons/navigation/login.svg" alt={$_('alt_login')} />
				</a>
			</li>
		{/if}
	</ul>
</nav>
