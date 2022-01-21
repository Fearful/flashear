import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import resolve from '@rollup/plugin-node-resolve';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
      postcss: true,
    }),
	kit: {
		adapter: adapter(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		}
	},
	vite: {
		plugins: [
			resolve({
				browser: true,
				dedupe: (importee) => importee === 'svelte' || importee.startsWith('svelte/'),
				preferBuiltins: false
			})
		]
	}
};

export default config;
