<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { _ } from 'svelte-i18n';

	export let isLoggedIn = false;
	const dispatch = createEventDispatcher();
	function logoutUser() {
		dispatch('logout');
	}
	function openNewPost() {
		dispatch('new');
	}

</script>

<div class="nav-container">
    <div class="nav-link">
      <a href="/" class="nav-link nav-home">
			<img width="32" height="32" src="/icons/navigation/home.svg" alt={$_('alt_home')} />
		</a>
    </div>
    <div class="nav-link">
	    <a href="/trending" class="nav-link nav-trending" >
			<img width="32" height="32" src="/icons/navigation/trending.svg" alt={$_('alt_trending')} />
		</a>
    </div>
    <div class="flex flex-1 justify-center font-bold text-center md:py-4 md:order-5 md:flex-none md:justify-start">
      <button
		aria-label={$_('new_post')}
		on:click={openNewPost}
		class="new-flash relative -top-1/4 p-0 w-16 h-16 bg-accentColor-700 rounded-full hover:bg-accentColor-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none md:hidden"
	>
		<svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" class="w-6 h-6 inline-block">
			<path
				fill="#FFFFFF"
				d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                            C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                            C15.952,9,16,9.447,16,10z"
			/>
		</svg>
	</button>
    </div>
    <div class="nav-link">
		<a href="/all" class="nav-link nav-all" >
			<img width="32" height="32" src="/icons/navigation/all.svg" alt={$_('alt_global')} />
		</a>
    </div>
    <div class="nav-link">
		{#if isLoggedIn}
			<button class="nav-auth-actions nav-link nav-logout" aria-label={$_('logout_aria')} on:click={logoutUser}>
				<img width="32" height="32" src="/icons/navigation/logout.svg" alt={$_('alt_logout')} />
			</button>
		{/if}
		{#if !isLoggedIn}
			<a href="/auth" class="nav-auth-actions nav-link nav-login" >
				<img width="32" height="32" src="/icons/navigation/login.svg" alt={$_('alt_login')} />

			</a>
		{/if}
    </div>
  </div>

<style lang="postcss">
	.nav-container {
		@apply bg-gray-50 dark:bg-backgroundDark-800 fixed bottom-0 overflow-visible w-full shadow-inner flex flex-row md:flex-col md:px-10 md:top-0 md:relative md:items-center;
	}
	@media (min-width: 768px) {
		.nav-container {
			min-width: 80px;max-width: 80px;
		}
	}
	.nav-link {
		@apply flex flex-1 justify-center text-xs font-bold text-center md:py-4 md:w-20 md:flex-none hover:bg-backgroundLight-100 dark:hover:bg-backgroundDark-700;
	}
	.nav-auth-actions {
		@apply hover:bg-backgroundLight-100 dark:hover:bg-backgroundDark-700;
	}
</style>