'use client'
import { useState, useRef, type FormEvent } from 'react'
import { Slider, type SliderProps } from './Slider'
import { merge } from '../utils/styles'
import { TextRewrite, type TextRewriteProps } from './TextRewrite'

export interface TextRewriteControlsProps extends TextRewriteProps {
	/** Props to pass to the range slider */
	sliderProps?: Partial<SliderProps>
}

/**
 * A smart text component with a slider to choose the version to display
 */
export const TextRewriteControls = ({
	value = 0,
	count = 1,
	children,
	className,
	sliderProps,
	...rest
}: TextRewriteControlsProps) => {
	const childRef = useRef<TextRewriteProps>(null)
	const [version, setVersion] = useState(value)

	const handleSlide = (e: FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement | null

		if (target) {
			setVersion(parseInt(target.value) ?? 0)
		}
	}

	return (
		<>
			<div className={merge('flex items-center gap-4', className)}>
				<div className="grow">
					<Slider
						min={0}
						max={count - 1}
						step={1}
						label="Version"
						className="mb-6"
						showValue
						defaultValue={version}
						onChange={handleSlide}
						{...sliderProps}
					/>
				</div>
				<button
					aria-label="Refetch text"
					className="flex ml-auto items-center justify-center w-9 h-9 text-xs font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-lg toggle-full-view hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
					onClick={() => childRef?.current?.refetch?.()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						className="w-5 h-5"
						aria-hidden="true"
						fill="none"
					>
						<path
							fill="currentColor"
							d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z"
						/>
					</svg>
				</button>
			</div>

			<TextRewrite
				ref={childRef}
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
