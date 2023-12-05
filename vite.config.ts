import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

import { generateSW } from './pwa.mjs';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			srcDir: './src',
			mode: 'development',
			strategies: generateSW ? 'generateSW' : 'injectManifest',
			filename: generateSW ? undefined : 'prompt-sw.ts',
			scope: '/',
			base: '/',
			selfDestroying: process.env.SELF_DESTROYING_SW === 'true',
			manifest: {
				short_name: 'Gray Matter Scouting',
				name: 'Gray Matter Scouting App (Scouter)',
				start_url: '/',
				scope: '/',
				display: 'standalone',
				theme_color: '#FFFFFF',
				background_color: '#092B4A',
				icons: [
					{
						src: '/favicon.png',
						sizes: '128x128',
						type: 'image/png'
					}
				]
			},
			injectManifest: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},
			workbox: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},
			devOptions: {
				enabled: true,
				suppressWarnings: process.env.SUPPRESS_WARNING === 'true',
				type: 'module',
				navigateFallback: '/'
			},
			kit: {}
		})
	]
});
