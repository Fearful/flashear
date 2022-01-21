<div class="ghost-container">
	<div class="grid grid-cols-3 gap-4">
		<div class="ghost-text col-span-2" />
		<div class="ghost-text col-span-1" />
	</div>
	<div class="ghost-text" />
</div>

<style lang="postcss">
	.ghost-container {
		@apply animate-pulse p-4 shadow-md border-2 border-gray-200 rounded-lg h-fit space-y-3 whitespace-pre-line;
		min-width: 15rem;
	}
	.ghost-text {
		@apply p-4 h-2 bg-gray-300 rounded;
	}
</style>