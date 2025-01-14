import { join } from 'path';
import type { Config } from 'tailwindcss';

import { skeleton } from '@skeletonlabs/tw-plugin';
import tailwindForms from '@tailwindcss/forms';

export default {
	content: [
		'src/app.html',
		'./src/**/*.svelte',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			backgroundColor: {
				blue: { 950: '#092B4A' }
			}
		}
	},
	plugins: [
		skeleton({
			themes: { preset: ['gold-nouveau'] }
		}),
		tailwindForms
	]
} satisfies Config;
