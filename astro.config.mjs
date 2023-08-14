import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import preprocess from 'svelte-preprocess';
import netlify from '@astrojs/netlify/functions';

export default defineConfig({
	// ...
	integrations: [
		svelte({
			preprocess: [
				preprocess({
					scss: {
						prependData: `@import "./src/style/style.scss";`,
					},
				}),
			],
		}),
	],

	output: 'server',
	adapter: netlify(),
});
