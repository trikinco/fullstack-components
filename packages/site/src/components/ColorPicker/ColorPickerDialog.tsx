'use client'
import dynamic from 'next/dynamic'
import { memo, useState, Suspense, ChangeEvent } from 'react'
import { colorsAndValuesOnly as colors, type Color } from '../../utils/tailwind'
import { IconCheck } from '../Icons/IconCheck'
import type { DialogProps } from '../Dialog'

const LazyDialog = dynamic(() => import('../Dialog'), { ssr: false })

export interface ColorPickerDialogProps extends Omit<DialogProps, 'title'> {
	/** Max limit of choices when `multiple` is true */
	max?: number
	/** Whether or not to render the color picker dialog in a portal */
	portal?: boolean
	/** Whether or not to allow picking multiple colors */
	multiple?: boolean
	/** Picked colors */
	pickedColors?: Color[]
	/** Dialog `onClose` callback */
	onClose: (data?: ['color', Color][]) => void
}

/**
 * Dialog that lists all Tailwind default colors,
 * for selecting colors with `ColorPicker`
 */
export const ColorPickerDialog = memo(function ColorPickerDialog({
	onClose,
	max,
	open,
	multiple,
	describedById,
	focusInitialRef,
	focusReturnRef,
	pickedColors,
}: ColorPickerDialogProps) {
	const [selectedColors, setSelectedColors] = useState(pickedColors)

	/**
	 * Handles the temporary selection of colors,
	 * which allows `isLimitedDisabled` to disable
	 * other checkboxes if `max` is reached when `multiple`
	 */
	const handleMaxLimit =
		(color: Color) => (event: ChangeEvent<HTMLInputElement>) => {
			const isChecked = event.target.checked

			if (isChecked) {
				setSelectedColors((colors) => [...(colors || []), color])
			} else {
				setSelectedColors((colors) => [
					...(colors || []).filter((x) => x !== color),
				])
			}
		}

	return (
		<Suspense fallback={null}>
			<LazyDialog
				title={`Pick ${multiple ? 'colors' : 'a color'}`}
				open={open}
				onClose={onClose}
				describedById={describedById}
				focusInitialRef={focusInitialRef}
				focusReturnRef={focusReturnRef}
				className="backdrop-blur-md bg-black/20 w-full max-w-full h-screen max-h-dvh sm:max-h-lvh"
				formProps={{
					className: 'md:max-w-5xl',
					onSubmit: (e) => e.stopPropagation(),
				}}
			>
				<div className="min-w-full w-full grid gap-0.5 sm:gap-2 grid-cols-11">
					{colors.map(({ name, values }) =>
						values.map((value) => {
							const colors = selectedColors || []
							const color: Color = `${name}-${value}`
							const isDefaultChecked = colors?.includes(color)
							const label = isDefaultChecked
								? `Remove ${color}`
								: `Pick ${color}`

							// Limits color choices to `max` when `multiple`
							const isLimitedDisabled =
								multiple && max
									? !isDefaultChecked && colors && colors?.length >= max
									: false

							return (
								<label className="flex relative" key={color} title={label}>
									<span className="sr-only">{label}</span>
									<input
										defaultChecked={isDefaultChecked}
										type={multiple ? 'checkbox' : 'radio'}
										name="color"
										disabled={isLimitedDisabled}
										value={color}
										onChange={handleMaxLimit(color)}
										className={`
                                            peer 
                                            bg-${color} disabled:opacity-80
                                            cursor-pointer disabled:cursor-not-allowed
                                            appearance-none rounded-md w-full h-8 sm:h-12
                                            focus:z-10 hover:z-10 
                                            border border-1 border-white/10  
                                            hover:outline-white/50 
											focus-ring`}
									/>
									<IconCheck
										width={20}
										height={20}
										className={`absolute z-20 ${
											parseInt(value) < 500 ? 'text-black' : 'text-white'
										} transition-opacity opacity-0 peer-checked:opacity-100 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4`}
									/>
								</label>
							)
						})
					)}
				</div>
			</LazyDialog>
		</Suspense>
	)
})

export default ColorPickerDialog
