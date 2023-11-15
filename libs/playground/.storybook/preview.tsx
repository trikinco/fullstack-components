import '../src/styles/globals.css'
import type { Preview } from '@storybook/react'
import { themes } from '@storybook/theming'
import { fontClassNames } from '../src/utils/fonts'
import { ID_DIALOG_PORTAL } from '../src/utils/constants'

const preview: Preview = {
	parameters: {
		docs: {
			theme: themes.dark,
		},
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		(Story) => (
			<div className={fontClassNames}>
				<Story />
				<div id={ID_DIALOG_PORTAL} />
			</div>
		),
	],
}

export default preview
