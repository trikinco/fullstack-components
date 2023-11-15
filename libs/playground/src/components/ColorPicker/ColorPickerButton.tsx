import type { HTMLAttributes } from 'react'
import { merge } from '../../utils/styles'
import { IconClose } from '../Icons/IconClose'
import type { Color } from '../../utils/tailwind'

export interface ColorPickerButtonProps
	extends HTMLAttributes<HTMLButtonElement> {
	disabled?: boolean
	color?: Color
}

/**
 * Button to remove a picked color in `ColorPicker`
 */
export const ColorPickerButton = ({
	onClick,
	color,
	disabled,
	title,
	...rest
}: ColorPickerButtonProps) => {
	// the tailwind color shade value
	const shade = color?.split('-').pop()

	return (
		<div className={merge('flex relative', color && 'group')}>
			<button
				type="button"
				onClick={onClick}
				disabled={disabled}
				title={title}
				className={merge(
					'w-12 h-12 rounded-md border border-1 border-white/10 outline outline-1 outline-white ring-1 ring-offset-1 ring-black hover:outline-white/50 focus:ring-2 focus:ring-white',
					color && `bg-${color}`
				)}
				{...rest}
			>
				{title && <span className="sr-only">{title}</span>}
			</button>

			{color && (
				<span className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-20 transition-opacity opacity-0 group-hover:opacity-100">
					<IconClose
						className={merge(
							shade && parseInt(shade) < 500 ? 'text-black' : 'text-white'
						)}
					/>
				</span>
			)}
		</div>
	)
}
