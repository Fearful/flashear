<script>
	export let message;
	export let sender;

	const messageClass = message.who !== sender ? 'sent' : 'received';
	const secondaryClass =
		messageClass === 'sent'
			? ' bg-white rounded-tl-none'
			: 'bg-green-50 text-green-900 rounded-tr-none';
	const avatar = `https://avatars.dicebear.com/api/initials/${message.who}.svg`;

	const ts = new Date(message.when);
</script>

<div class={`place-self-${messageClass === 'sent' ? 'end text-right' : 'start text-left'}`}>
	<div class={`p-5 rounded-2xl ${secondaryClass}`}>
		<img src={avatar} alt="avatar" class="rounded-full w-8 inline" />
		<p class="inline pl-2">{message.what}</p>
		<time class="relative -top-6 left-4 text-xs">{ts.toLocaleTimeString()}</time>
	</div>
</div>
