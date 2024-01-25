import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
	name: 'my-custom-theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `system-ui`,
		'--theme-font-family-heading': `system-ui`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '8px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '255 255 255',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '255 255 255',
		'--on-error': '255 255 255',
		'--on-surface': '0 0 0',
		// =~= Theme Colors  =~=
		// primary | #e000e0
		'--color-primary-50': '250 217 250', // #fad9fa
		'--color-primary-100': '249 204 249', // #f9ccf9
		'--color-primary-200': '247 191 247', // #f7bff7
		'--color-primary-300': '243 153 243', // #f399f3
		'--color-primary-400': '233 77 233', // #e94de9
		'--color-primary-500': '224 0 224', // #e000e0
		'--color-primary-600': '202 0 202', // #ca00ca
		'--color-primary-700': '168 0 168', // #a800a8
		'--color-primary-800': '134 0 134', // #860086
		'--color-primary-900': '110 0 110', // #6e006e
		// secondary | #092B4A
		'--color-secondary-50': '218 223 228', // #dadfe4
		'--color-secondary-100': '206 213 219', // #ced5db
		'--color-secondary-200': '194 202 210', // #c2cad2
		'--color-secondary-300': '157 170 183', // #9daab7
		'--color-secondary-400': '83 107 128', // #536b80
		'--color-secondary-500': '9 43 74', // #092B4A
		'--color-secondary-600': '8 39 67', // #082743
		'--color-secondary-700': '7 32 56', // #072038
		'--color-secondary-800': '5 26 44', // #051a2c
		'--color-secondary-900': '4 21 36', // #041524
		// tertiary | #0EA5E9
		'--color-tertiary-50': '219 242 252', // #dbf2fc
		'--color-tertiary-100': '207 237 251', // #cfedfb
		'--color-tertiary-200': '195 233 250', // #c3e9fa
		'--color-tertiary-300': '159 219 246', // #9fdbf6
		'--color-tertiary-400': '86 192 240', // #56c0f0
		'--color-tertiary-500': '14 165 233', // #0EA5E9
		'--color-tertiary-600': '13 149 210', // #0d95d2
		'--color-tertiary-700': '11 124 175', // #0b7caf
		'--color-tertiary-800': '8 99 140', // #08638c
		'--color-tertiary-900': '7 81 114', // #075172
		// success | #FFDF00
		'--color-success-50': '255 250 217', // #fffad9
		'--color-success-100': '255 249 204', // #fff9cc
		'--color-success-200': '255 247 191', // #fff7bf
		'--color-success-300': '255 242 153', // #fff299
		'--color-success-400': '255 233 77', // #ffe94d
		'--color-success-500': '255 223 0', // #FFDF00
		'--color-success-600': '230 201 0', // #e6c900
		'--color-success-700': '191 167 0', // #bfa700
		'--color-success-800': '153 134 0', // #998600
		'--color-success-900': '125 109 0', // #7d6d00
		// warning | #bd6500
		'--color-warning-50': '245 232 217', // #f5e8d9
		'--color-warning-100': '242 224 204', // #f2e0cc
		'--color-warning-200': '239 217 191', // #efd9bf
		'--color-warning-300': '229 193 153', // #e5c199
		'--color-warning-400': '209 147 77', // #d1934d
		'--color-warning-500': '189 101 0', // #bd6500
		'--color-warning-600': '170 91 0', // #aa5b00
		'--color-warning-700': '142 76 0', // #8e4c00
		'--color-warning-800': '113 61 0', // #713d00
		'--color-warning-900': '93 49 0', // #5d3100
		// error | #cb0b0b
		'--color-error-50': '247 218 218', // #f7dada
		'--color-error-100': '245 206 206', // #f5cece
		'--color-error-200': '242 194 194', // #f2c2c2
		'--color-error-300': '234 157 157', // #ea9d9d
		'--color-error-400': '219 84 84', // #db5454
		'--color-error-500': '203 11 11', // #cb0b0b
		'--color-error-600': '183 10 10', // #b70a0a
		'--color-error-700': '152 8 8', // #980808
		'--color-error-800': '122 7 7', // #7a0707
		'--color-error-900': '99 5 5', // #630505
		// surface | #90a6ea
		'--color-surface-50': '238 242 252', // #eef2fc
		'--color-surface-100': '233 237 251', // #e9edfb
		'--color-surface-200': '227 233 250', // #e3e9fa
		'--color-surface-300': '211 219 247', // #d3dbf7
		'--color-surface-400': '177 193 240', // #b1c1f0
		'--color-surface-500': '144 166 234', // #90a6ea
		'--color-surface-600': '130 149 211', // #8295d3
		'--color-surface-700': '108 125 176', // #6c7db0
		'--color-surface-800': '86 100 140', // #56648c
		'--color-surface-900': '71 81 115' // #475173
	}
};
