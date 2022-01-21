// src/i18n.js
import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

register('es', () => import('./lang/es.json'));
register('es-AR', () => import('./lang/es.json'));
register('en', () => import('./lang/en.json'));
register('en-US', () => import('./lang/en.json'));

init({
	fallbackLocale: 'es',
	initialLocale: getLocaleFromNavigator()
});
// starts loading 'en-US' and 'en'
