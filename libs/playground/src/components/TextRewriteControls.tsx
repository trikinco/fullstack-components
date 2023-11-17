'use client'
import { useState, useRef, type FormEvent } from 'react'
import { Slider, type SliderProps } from './Slider'
import { merge } from '@trikinco/fullstack-components/utils'
import { TextRewrite, type TextRewriteProps } from '../modules/TextRewrite'
import { IconRefresh } from './Icons/IconRefresh'

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
					<IconRefresh />
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
