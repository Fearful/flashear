<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<div class="empty-container">
	<span class="empty-text">{$_('empty_items.message')}</span>
</div>

<style lang="postcss">
	.empty-container {
		@apply grid place-items-center h-full w-48 text-center mx-auto dark:text-slate-200;
	}
	.empty-text {
		@apply inline-block align-middle font-semibold;
	}
</style>