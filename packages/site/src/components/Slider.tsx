import { type HTMLAttributes, type FormEvent, useId, useRef } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'

export interface SliderProps extends HTMLAttributes<HTMLInputElement> {
	/** Range lower-bound */
	min?: number
	/** Range upper-bound */
	max?: number
	/** Step value for segmented sliders */
	step?: number
	/** The default/initial slider value */
	defaultValue?: number
	/** The label text */
	label: string
	/** Hides the `label` visually, uses `label` for assistive tech */
	hideLabel?: boolean
	/** Class names to add to the `<label>` */
	labelClassName?: string
	/** Whether the current value should be visible */
	showValue?: boolean
}

/**
 * A range slider
 */
export const Slider = ({
	min,
	max,
	step,
	label,
	hideLabel,
	showValue,
	labelClassName,
	className,
	defaultValue,
	onChange,
	...rest
}: SliderProps) => {
	const sliderId = useId()
	const value = useRef(defaultValue)

	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement | null

		if (value) {
			value.current = target?.value ? parseInt(target.value) : undefined
		}

		onChange?.(e)
	}

	return (
		<>
			<label
				htmlFor={sliderId}
				className={merge(
					'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
					hideLabel && 'sr-only',
					labelClassName
				)}
			>
				{label}
				{showValue && value?.current !== undefined && (
					<>
						{' '}
						<output>{value.current + 1}</output>
					</>
				)}
			</label>
			<input
				id={sliderId}
				type="range"
				defaultValue={defaultValue}
				min={min}
				max={max}
				step={step}
				className={merge(
					'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700',
					className
				)}
				onChange={handleChange}
				{...rest}
			/>
		</>
	)
}
