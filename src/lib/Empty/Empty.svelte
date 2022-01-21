<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<div class="empty-container">
	<span class="empty-text">{$_('empty_items.message')}</span>
</div>

<style lang="postcss">
	.empty-container {
		@apply grid place-items-center h-screen;
	}
	.empty-text {
		@apply inline-block align-middle font-semibold;
	}
</style>