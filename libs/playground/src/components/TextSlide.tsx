'use client'
import { useState, type FormEvent } from 'react'
import { Slider, type SliderProps } from './Slider'
import { TextRewrite, type TextRewriteProps } from './TextRewrite'

export interface TextSlideProps extends TextRewriteProps {
	/** Props to pass to the range slider */
	sliderProps?: Partial<SliderProps>
}

/**
 * A smart text component with a slider to choose the version to display
 */
export const TextSlide = ({
	value = 0,
	count = 1,
	children,
	className,
	sliderProps,
	...rest
}: TextSlideProps) => {
	const [version, setVersion] = useState(value)

	const handleSlide = (e: FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement | null

		if (target) {
			setVersion(parseInt(target.value) ?? 0)
		}
	}

	return (
		<>
			<div className={className}>
				<Slider
					min={0}
					max={count - 1}
					step={1}
					label="Version"
					className="mb-6"
					defaultValue={version}
					onChange={handleSlide}
					{...sliderProps}
				/>
			</div>

			<TextRewrite
				className={className}
				value={version}
				count={count}
				{...rest}
			>
				{children}
			</TextRewrite>
		</>
	)
}
