<script lang="ts">
	import { goto } from '$app/navigation';
	import { _ } from 'svelte-i18n';
	import { gun, user, username } from '../../store';
	// If user is loggedIn then go to home
	if (user.is) goto('/');

	let userN;
	let password;

	function login() {
		const ack = user.auth(userN, password, ({ err }) => {
			if (err) alert(err);
			else goto('/');
		});
	}

	function signup() {
		user.create(userN, password, ({ err }) => {
			if (err) {
				alert(err);
			} else {
				login();
			}
		});
	}
	function onSubmit(e) {
		e.preventDefault();
		login();
	}
</script>

<svelte:head>
	<title>{$_('auth.title')} - Flashear</title>
</svelte:head>

<div class="flex items-center justify-center h-screen mx-auto">
	<div class="flex flex-col w-80 rounded-lg px-8 py-10">
		<form class="flex flex-col space-y-4 mt-10" on:submit|preventDefault={onSubmit}>
			<label class="px-2 font-semibold" for="userN">{$_('auth.form.userLabel')}</label>
			<input
				type="text"
				name="userN"
				bind:value={userN}
				minlength="3"
				maxlength="16"
				class="border rounded-lg py-3 px-3 bg-gray-300 shadow-inner border-gray-300 shadow-inner placeholder-gray-500"
			/>
			<label class="px-2 font-semibold" for="password">{$_('auth.form.passwordLabel')}</label>
			<input
				name="password"
				bind:value={password}
				type="password"
				class="border rounded-lg py-3 px-3 bg-gray-300 shadow-inner border-gray-300 shadow-inner placeholder-gray-500"
			/>
			<div class="flex flex-row space-x-4">
				<button
					aria-label={$_('auth.form.loginLabel')}
					on:click={login}
					class="loginBtn border border-blue-500 bg-blue-500 text-white rounded-lg py-3 px-0.5 font-semibold w-1/2"
					>{$_('auth.form.loginButton')}</button
				>
				<button
					aria-label={$_('auth.form.signupLabel')}
					on:click={signup}
					class="signupBtn border border-blue-500 bg-blue-500 text-white rounded-lg py-3 px-0.5 font-semibold w-1/2"
					>{$_('auth.form.signupButton')}</button
				>
			</div>
		</form>
	</div>
</div>
