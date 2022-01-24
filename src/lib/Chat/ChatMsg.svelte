<script>
	export let message;
	export let sender;

	const messageClass = message.who !== sender ? 'sent' : 'received';
	const secondaryClass =
		messageClass === 'sent'
			? ' bg-white rounded-tl-none dark:bg-backgroundDark-700 dark:text-white'
			: 'bg-accentColor-50 text-accentColor-900 dark:bg-accentColor-800 dark:text-accentColor-50 rounded-tr-none';
	const avatar = `https://avatars.dicebear.com/api/initials/${message.who}.svg`;

	const ts = new Date(message.when);
</script>

<div class={`place-self-${messageClass !== 'sent' ? 'end text-right' : 'start text-left'}`}>
	<div class={`p-5 rounded-2xl ${secondaryClass}`}>
		<img src={avatar} alt="avatar" class="rounded-full w-8 inline" />
		<p class="inline pl-2">{message.what}</p>
		<time class="relative -top-6 left-4 text-xs">{ts.toLocaleTimeString()}</time>
	</div>
</div>
