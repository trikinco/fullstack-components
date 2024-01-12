import path from 'path'
import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-a11y',
		'@storybook/addon-essentials',
		'@storybook/addon-onboarding',
		'@storybook/addon-interactions',
		'@storybook/addon-themes',
	],
	framework: {
		name: '@storybook/nextjs',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
	webpackFinal: async (config) => {
		config = {
			...config,
			resolve: {
				...config.resolve,
				alias: {
					...config.resolve?.alias,
					'@/src': path.resolve(__dirname, '../src'),
					'@/public': path.resolve(__dirname, '../public'),
				},
			},
		}

		return config
	},
}
export default config
