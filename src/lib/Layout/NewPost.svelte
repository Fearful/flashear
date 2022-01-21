<script lang="ts">
	import { goto } from '$app/navigation';
	import { _ } from 'svelte-i18n';
	import { db, user, username } from '../../store';
	// los hashtags deben venir de la publicacion misma, de no contener asignar por defecto pienso

	let visible = false, msg = '', category = ['n00b'];
	const hashtagRegex = /\B#([a-z0-9]{2,})(?![~!@#$%^&*()=+_`\-\|\/'\[\]\{\}]|[?.,]*\w)/ig;

	const flashes = db.get('flashes');

	const replaceTagsForLinks = (text) => {
		var repl = text.replace(hashtagRegex, '<a href="/all?tag=$1">#$1</a>');
    	return repl;
	}

	function submitMsg() {
		if (!user.is) {
			goto('/auth');
			return;
		}
		const hashtagsContained = msg.match(hashtagRegex)
		if (hashtagsContained && hashtagsContained.length > 0) {
			category = hashtagsContained;	
		}
		const fl = {
			content: replaceTagsForLinks(msg),
			when: new Date().toISOString(),
			category: JSON.stringify(category),
			author: $username,
			stars: 0,
			flags: 0
		};
		flashes.set(fl).once(function (node, index) {
			db.user().get('myflashes').get(index).set(node);
		});
		msg = '';
		category = ['n00b'];
		visible = false;
	}
	function onSubmit(e) {
		e.preventDefault();
		submitMsg();
	}
</script>

{#if visible}
	<div class="fixed top-8 right-6">
		<div class="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
			<div class="bg-white w-full shadow-md rounded p-6 sm:p-12">
				<p class="text-3xl font-bold leading-7 text-center">{$_('post_popup.title')}</p>
				<form on:submit|preventDefault={onSubmit}>
					<div>
						<div class="w-full flex flex-col mt-8">
							<label class="font-semibold leading-none" for="contentIdentifier">{$_('post_popup.contentLabel')}</label>
							<textarea
								bind:value={msg}
								type="text"
								class="h-40 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
								id="contentIdentifier"
							/>
						</div>
					</div>
					<div class="flex items-center justify-center w-full">
						<button
							aria-label={$_('post_popup.publishAria')}
							on:click={submitMsg}
							class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none"
						>
							{$_('post_popup.publishLabel')}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}

<div class="fixed bottom-4 right-4">
	<button
		aria-label={$_('new_post')}
		on:click={() => {
			visible = !visible;
		}}
		class="new-flash p-0 w-16 h-16 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
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
