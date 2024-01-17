import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import defaultColors from 'tailwindcss/colors'

const config: Config = {
	darkMode: ['class'],
	content: [
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
		/**
		 * Adds FSC as a content source to include tw classes from the lib.
		 * @see https://tailwindcss.com/docs/content-configuration
		 */
		'./node_modules/@trikinco/fullstack-components/src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		fontFamily: {
			sans: ['var(--font-base)', ...defaultTheme.fontFamily.sans],
			mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
		},
		colors: {
			primary: '#00FCCE',
			...defaultColors,
		},
	},
	plugins: [require('@tailwindcss/typography'), require('autoprefixer')],
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
