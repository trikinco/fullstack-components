import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		fontFamily: {
			sans: ['var(--font-base)', ...defaultTheme.fontFamily.sans],
			mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
		},
		extend: {
			animation: {
				typewriter: 'typing 2s steps(30, end)',
				writing: 'caret 1.5s step-end infinite',
			},
			keyframes: {
				typing: {
					'0%': { width: '0' },
					'100%': { width: '100%' },
				},
				caret: {
					'0%, 100%': { background: 'transparent' },
					'50%': { background: 'currentcolor' },
				},
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
	safelist: [
		{
			/**
			 * Generates classNames for all bg- colors except the deprecated ones
			 * Used for the color picker.
			 * Remove if not using the color picker to avoid bloating the bundle.
			 * @see {@link https://tailwindcss.com/docs/content-configuration#using-regular-expressions Safelist with regular expression}
			 */
			pattern:
				/bg-(?!(lightBlue|warmGray|trueGray|coolGray|blueGray)-[^\/]+\/)/,
		},
	],
}

export default config
