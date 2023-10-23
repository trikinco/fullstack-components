import type { Meta, StoryObj } from '@storybook/react'

import { TextRewrite } from './TextRewrite'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
	component: TextRewrite,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div className="flex w-full max-w-sm">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof TextRewrite>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const WithSlider: Story = {
	args: {
		defaultValue: 4,
		showSlider: true,
		sliderProps: { label: 'Rewrite strength', showValue: true },
	},
}

export const FixedStep: Story = {
	args: {
		value: 1,
	},
}

export const AsComponent = () => (
	<TextRewrite>
		<h3>Quantum formalism and the uncertainty principle</h3>
		<p>
			One consequence of the basic quantum formalism is the uncertainty
			principle. In its most familiar form, this states that no preparation of a
			quantum particle can imply simultaneously precise predictions both for a
			measurement of its position and for a measurement of its momentum.
		</p>
		<p>
			Both position and momentum are observables, meaning that they are
			represented by Hermitian operators. The position operator X and momentum
			operator P do not commute, but rather satisfy the canonical commutation
			relation.
		</p>
	</TextRewrite>
)
