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
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
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
					'0%, 100%': { borderColor: 'transparent' },
					'50%': { borderColor: 'currentcolor' },
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
