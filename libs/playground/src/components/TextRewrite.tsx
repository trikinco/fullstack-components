import { useState } from 'react'
import type { HTMLAttributes, ReactNode, ElementType, FormEvent } from 'react'
import { Slider, type SliderProps } from './Slider'
import { merge } from '../utils/styles'

export interface TextRewriteProps extends HTMLAttributes<HTMLElement> {
	component?: ElementType
	/** The original text to be rewritten */
	children?: ReactNode
	/** shows the rewrite strength range slider */
	showSlider?: boolean
	/** The default rewrite strength level */
	defaultValue?: number
	/** The fixed rewrite strength level */
	value?: number
	/** Props to pass to the range slider if `showSlider` is true */
	sliderProps?: Partial<SliderProps>
}

// Just mock the desired output for now
const content = [
	{
		strength: '0',
		content: [
			'<h3 class="text-xl font-bold mb-3">Quantum formalism and the uncertainty principle</h3>',
			'<p>One consequence of the basic quantum formalism is the uncertainty principle. In its most familiar form, this states that no preparation of a quantum particle can imply simultaneously precise predictions both for a measurement of its position and for a measurement of its momentum.</p>',
			'<p>Both position and momentum are observables, meaning that they are represented by Hermitian operators. The position operator X and momentum operator P do not commute, but rather satisfy the canonical commutation relation.</p>',
		],
	},
	{
		strength: '1',
		content: [
			'<h3 class="text-xl font-bold mb-3">Quantum Formalism and Uncertainty</h3>',
			"<p>In quantum physics, there's the uncertainty principle. It says you can't know a particle's position and momentum precisely at the same time.</p>",
			"<p>Position and momentum are measured with Hermitian operators. X and P don't agree but follow a specific rule.</p>",
		],
	},
	{
		strength: '2',
		content: [
			'<h3 class="text-xl font-bold mb-3">Quantum Physics: Uncertainty</h3>',
			"<p>In quantum physics, there's the uncertainty principle. It says you can't know both a particle's position and momentum precisely.</p>",
			"<p>Position and momentum are measured using Hermitian operators. X and P don't agree but follow a specific rule.</p>",
		],
	},
	{
		strength: '3',
		content: [
			'<h3 class="text-xl font-bold mb-3">Understanding Uncertainty in Quantum Physics</h3>',
			"<p>In quantum physics, we have the uncertainty principle. It means you can't know a particle's position and momentum at the same time.</p>",
			"<p>Position and momentum are measured using special operators. X and P don't agree but follow a specific rule.</p>",
		],
	},
	{
		strength: '4',
		content: [
			'<h3 class="text-xl font-bold mb-3">What is the Uncertainty Principle in Quantum Physics?</h3>',
			"<p>The uncertainty principle in quantum physics says you can't know both a particle's position and momentum at the same time.</p>",
		],
	},
]

/**
 * A smart component that simplifies, summarises or completely rewrites the text within.
 *
 * @consideration option for pre-processing information into multiple 'rewrite strength levels' that
 * the user can swap between on the fly.
 * @consideration allow the user to regenerate a rewrite step.
 * @consideration design a `controls` "API" - setting some standards for what the user may want to control
 */
export const TextRewrite = ({
	value,
	defaultValue,
	sliderProps,
	children,
	component,
	className,
	showSlider,
	...rest
}: TextRewriteProps) => {
	const WrapperComponent = component || 'div'
	// TODO: parse `children`
	// TODO: GET options from API - move functionality to a hook
	const [options, setOptions] = useState(content)
	const [level, setLevel] = useState(value ?? defaultValue ?? 0)

	const handleSlide = (e: FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement | null

		if (target) {
			setLevel(parseInt(target.value) ?? 0)
		}
	}

	return (
		<WrapperComponent className={merge('w-full', className)} {...rest}>
			{showSlider && (
				<Slider
					min={0}
					max={4}
					step={1}
					label="Rewrite strength"
					className="mb-6"
					defaultValue={level}
					onChange={handleSlide}
					{...sliderProps}
				/>
			)}
			{options ? (
				<div
					dangerouslySetInnerHTML={{ __html: options[level].content.join('') }}
				/>
			) : null}
		</WrapperComponent>
	)
}
