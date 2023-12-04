import type { Meta, StoryObj } from '@storybook/react'

import { ColorPicker } from './ColorPicker'
import { Button } from '../Elements/Button'
import { ReactNode } from 'react'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
	component: ColorPicker,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {},
} satisfies Meta<typeof ColorPicker>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Single: Story = {
	args: {},
}

export const SingleWithValue: Story = {
	args: {
		defaultValue: 'cyan-300',
	},
}

export const SingleWithOnChange: Story = {
	args: {
		defaultValue: 'cyan-300',
		onChange: (values) => console.log('SingleWithOnChange', values),
	},
}

export const Multiple: Story = {
	args: {
		multiple: true,
	},
}

export const MultipleWithMaxLimit: Story = {
	args: {
		multiple: true,
		max: 5,
	},
}

export const MultipleWithValues: Story = {
	args: {
		multiple: true,
		defaultValue: ['purple-600', 'lime-400'],
	},
}

export const MultipleWithOnChange: Story = {
	args: {
		multiple: true,
		defaultValue: ['purple-600', 'lime-400'],
		onChange: (values) => console.log('MultipleWithOnChange', values),
	},
}

/**
 * Single-value color picker rendered in a portal.
 * The portal is set up separately.
 */
export const PortalSingle: Story = {
	args: {
		portal: true,
	},
}

/**
 * Multi-value color picker rendered in a portal.
 * The portal is set up separately.
 */
export const PortalMultiple: Story = {
	args: {
		portal: true,
		multiple: true,
	},
}

const Form = ({ children }: { children: ReactNode }) => (
	<form
		onSubmit={(e) => {
			e.preventDefault()
			const target = e.target as HTMLFormElement | null
			const formData = target ? new FormData(target) : null
			const data = Array.from(formData?.entries() || [])

			console.log('Form data', data)
		}}
		className="flex flex-wrap gap-3"
	>
		<input
			type="text"
			className="p-3 bg-white border-black/20 text-black"
			name="name"
			defaultValue="Mr. Bubbles"
		/>
		{children}
		<Button type="submit">Submit</Button>
	</form>
)

export const SingleWithinAForm: Story = {
	args: {
		defaultValue: 'purple-600',
	},
	decorators: [
		(Story) => (
			<Form>
				<Story />
			</Form>
		),
	],
}

export const MultipleWithinAForm: Story = {
	args: {
		multiple: true,
		defaultValue: ['purple-600', 'lime-400'],
	},
	decorators: [
		(Story) => (
			<Form>
				<Story />
			</Form>
		),
	],
}
