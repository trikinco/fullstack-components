import type { Meta, StoryObj } from '@storybook/react'
import { IconCode } from './Icons/IconCode'
import { IconEye } from './Icons/IconEye'

import { Tabs } from './Tabs'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
	component: Tabs,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {},
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
	args: {
		tabs: [
			{
				id: 'tab-1',
				label: 'Preview',
				icon: <IconEye />,
				children: <div className="text-white p-6">Tab 1</div>,
			},
			{
				id: 'tab-2',
				label: 'Code',
				icon: <IconCode />,
				children: <div className="text-white p-6">Tab 2</div>,
			},
		],
	},
}
