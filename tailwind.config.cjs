const withAnimations = require('animated-tailwindcss');

module.exports = withAnimations({
	mode: 'jit',
	content: ['./src/**/*.svelte'],
	safelist: ['animate-hinge', 'shadow-inner', 'snap-x', 'snap-center']
});
