const config = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: ({ colors }) => ({
				accentColor: colors.purple,
				backgroundDark: colors.zinc,
				backgroundLight: colors.slate,
			}),
		}
	},

	plugins: []
};

module.exports = config;
