import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		paths: {
			base: ''
		}
	},
	vitePlugin: {
		inspector: {
			holdMode: true
		}
	}
};

export default config;
