/** @type {import('tailwindcss').Config} */
export default {
	content: ['src/app.html', './src/**/*.svelte'],
	theme: {
		extend: {
			backgroundColor: {
				blue: { 950: '#092B4A' }
			}
		}
	},
	plugins: []
};
