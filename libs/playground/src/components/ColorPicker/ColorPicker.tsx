'use client'
import {
	useState,
	useId,
	useRef,
	useCallback,
	useEffect,
	type SyntheticEvent,
} from 'react'
import { Portal } from '../Portal'
import { ID_DIALOG_PORTAL } from '../../utils/constants'
import { merge } from '@trikinco/fullstack-components/utils'
import { ColorPickerButton } from './ColorPickerButton'
import { ColorPickerDialog } from './ColorPickerDialog'
import type { Color } from '../../utils/tailwind'

export interface BaseColorPickerProps {
	/**
	 * `name` attribute for the hidden input field that holds all color selections.
	 * This allows the `ColorPicker` to be submitted as part of a form.
	 * Default: 'color' or if `multiple`, 'colors'
	 */
	name?: string
	/** The main button label. Falls back to 'Pick colors' or if `multiple`, 'Pick a color' */
	labelButton?: string
	/** Max limit of choices when `multiple: true` */
	max?: number
	/**
	 * Whether or not to render the color picker dialog in a portal.
	 *
	 * The dialog uses a native `<dialog>` with a `<form>` to handle
	 * its callbacks and actions, so a portal may be needed to avoid nested forms.
	 * */
	portal?: boolean
	/** Callback for when colors are picked or removed */
	onChange?: (values?: Color | Color[]) => void
}

export interface SingleColorPickerProps extends BaseColorPickerProps {
	/** Enable to allow picking multiple colors. Single color pickers are `multiple: false` */
	multiple?: false
	/** The default selected color or colors when `multiple` */
	defaultValue?: Color
}

export interface MultiColorPickerProps extends BaseColorPickerProps {
	/** Enable to allow picking multiple colors. Single color pickers are `multiple: false` */
	multiple: true
	/** The default selected color or colors when `multiple` */
	defaultValue?: Color[]
}

export type ColorPickerProps = SingleColorPickerProps | MultiColorPickerProps

/**
 * Allows picking one or `multiple` Tailwind colors
 */
export const ColorPicker = ({
	onChange,
	defaultValue,
	labelButton,
	name,
	max,
	multiple,
	portal,
}: ColorPickerProps) => {
	const [open, setOpen] = useState(false)
	const [pickedColors, setPickedColors] = useState(
		Array.isArray(defaultValue)
			? defaultValue
			: (defaultValue && [defaultValue]) || []
	)
	const describedById = useId()
	const focusReturnRef = useRef<HTMLButtonElement>(null)
	const focusInitialRef = useRef<HTMLInputElement>(null)

	const colorSingle = pickedColors?.[0]
	const inputName = name || (multiple ? 'colors' : 'color')
	const labelPick = labelButton || (multiple ? 'Pick colors' : 'Pick a color')
	const labelEmpty = `No ${multiple ? 'colors' : 'color'} chosen`
	const labelMultiple = !!pickedColors?.length ? '' : labelEmpty
	const labelPicked =
		(!multiple && pickedColors?.[0]) ||
		(multiple && labelMultiple) ||
		(!multiple && labelEmpty) ||
		''

	/**
	 * Trigger `onChange` when picking or removing colors
	 */
	useEffect(() => {
		onChange?.(multiple ? pickedColors : pickedColors?.[0])
	}, [onChange, pickedColors, multiple])

	/**
	 * Handles closing / submitting the `ColorPickerDialog`
	 */
	const handleClose = useCallback((data?: ['color', Color][]) => {
		const colors = (data?.flat().filter((x) => x !== 'color') || []) as Color[]

		setPickedColors(colors)
		setOpen(false)
	}, [])

	/**
	 * Removes a picked color from the preview (not in the dialog),
	 * or opens the dialog if no color is selected and the mode is single color selection
	 */
	const handleToggleColor =
		(color?: string, multiple?: boolean) =>
		(_event: SyntheticEvent<HTMLButtonElement>) => {
			if (!color && !multiple) {
				return setOpen(true)
			}

			setPickedColors((pickedColors) => pickedColors.filter((c) => c !== color))
		}

	const ColorDialog = () => (
		<ColorPickerDialog
			onClose={handleClose}
			open={open}
			multiple={multiple}
			max={max}
			focusInitialRef={focusInitialRef}
			focusReturnRef={focusReturnRef}
			pickedColors={pickedColors}
			describedById={describedById}
		/>
	)

	return (
		<>
			<input name={inputName} value={pickedColors} hidden readOnly />
			{portal ? (
				<Portal id={ID_DIALOG_PORTAL}>
					<ColorDialog />
				</Portal>
			) : (
				<ColorDialog />
			)}

			<div className="flex gap-3">
				{!multiple && (
					<ColorPickerButton
						color={colorSingle}
						title={colorSingle ? `Remove ${colorSingle}` : labelPick}
						onClick={handleToggleColor(colorSingle)}
					/>
				)}
				<button
					type="button"
					ref={focusReturnRef}
					onClick={() => setOpen(true)}
					className={merge('flex items-center gap-3', multiple && 'py-3')}
				>
					<span className="flex flex-col items-start gap-1">
						{labelPicked && <span className="text-sm">{labelPicked}</span>}

						<span className="font-bold" id={describedById}>
							{labelPick}
						</span>
					</span>
				</button>
			</div>

			{multiple && (
				<div className="flex flex-wrap gap-3">
					{pickedColors.map((color) => (
						<ColorPickerButton
							key={color}
							color={color}
							title={`Remove ${color}`}
							onClick={handleToggleColor(color, multiple)}
						/>
					))}
				</div>
			)}
		</>
	)
}
