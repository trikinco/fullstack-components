'use client'
import { useState } from 'react'
import type { HTMLAttributes, ElementType, FormEvent } from 'react'
import { Slider, type SliderProps } from './Slider'
import { merge } from '../utils/styles'
import { useText } from '../hooks/useText'
import type { RewriteOptions } from '../models/Text'

export interface TextRewriteProps
	extends RewriteOptions,
		Omit<HTMLAttributes<HTMLElement>, 'children'> {
	component?: ElementType
	/** shows the rewrite strength range slider */
	showSlider?: boolean
	/** The default rewrite strength level */
	defaultValue?: number
	/** The fixed rewrite strength level */
	value?: number
	/** Props to pass to the range slider if `showSlider` is true */
	sliderProps?: Partial<SliderProps>
}

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
	// Rewrite options
	count,
	tone,
	strength,
	grade,
	max,
	min,
	// HTML props and rest
	...rest
}: TextRewriteProps) => {
	const WrapperComponent = component || 'div'
	const { content } = useText({
		children,
		count,
		tone,
		strength,
		grade,
		max,
		min,
		enabled: true,
	})
	const [level, setLevel] = useState(value ?? defaultValue ?? 0)

	const handleSlide = (e: FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement | null

		if (target) {
			setLevel(parseInt(target.value) ?? 0)
		}
	}

	return (
		<>
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
			<WrapperComponent
				// dangerouslySetInnerHTML={{
				// 	__html: versions ? versions[level].content.join('') : null,
				// }}
				dangerouslySetInnerHTML={{
					__html: content ? content.content : null,
				}}
				className={merge('w-full', className)}
				{...rest}
			/>
		</>
	)
}
