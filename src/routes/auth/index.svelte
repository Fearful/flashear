<script lang="ts">
	import { goto } from '$app/navigation';
	import { _ } from 'svelte-i18n';
	import { gun, user } from '../../store';
	// If user is loggedIn then go to home
	if (user.is) goto('/');

	let username;
	let password;

	function login() {
		const ack = user.auth(username, password, ({ err }) => {
			if (err) alert(err);
			else goto('/');
		});
	}

	function signup() {
		user.create(username, password, ({ err }) => {
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
	<div class="auth-container">
		<form class="auth-form" on:submit|preventDefault={onSubmit}>
			<label class="px-2 font-semibold" for="username">{$_('auth.form.userLabel')}</label>
			<input
				type="text"
				name="username"
				bind:value={username}
				minlength="3"
				maxlength="16"
				class="auth-form-input"
			/>
			<label class="px-2 font-semibold" for="password">{$_('auth.form.passwordLabel')}</label>
			<input
				name="password"
				bind:value={password}
				type="password"
				class="auth-form-input"
			/>
			<div class="flex flex-row space-x-4">
				<button
					aria-label={$_('auth.form.loginLabel')}
					on:click={login}
					class="loginBtn auth-submit-button"
					>{$_('auth.form.loginButton')}</button
				>
				<button
					aria-label={$_('auth.form.signupLabel')}
					on:click={signup}
					class="signupBtn auth-submit-button"
					>{$_('auth.form.signupButton')}</button
				>
			</div>
		</form>
	</div>
</div>

<style lang="postcss">
	.auth-container {
		@apply flex flex-col w-80 rounded-lg px-8 py-10;
	}
	.auth-form {
		@apply flex flex-col space-y-4 mt-10;
	}
	.auth-form-input {
		@apply border rounded-lg py-3 px-3 bg-gray-300 shadow-inner border-gray-300 shadow-inner placeholder-gray-500;
	}
	.auth-submit-button {
		@apply border border-blue-500 bg-blue-500 text-white rounded-lg py-3 px-0.5 font-semibold w-1/2;
	}
</style>