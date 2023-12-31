import type { ElementType, HTMLAttributes } from 'react'
import type { AsComponent } from '@trikinco/fullstack-components'
import { merge } from '@trikinco/fullstack-components/utils'

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
	color?: 'primary' | 'secondary'
	variant?: 'contained' | 'outlined'
}

export const defaultElement = 'button'

/**
 * Primary UI component for user interaction
 */
export const Button = <C extends ElementType = typeof defaultElement>({
	as,
	color,
	variant,
	className,
	children,
	...props
}: AsComponent<C, ButtonProps>) => {
	const Component = as || defaultElement
	const type = !as || as === defaultElement ? 'button' : undefined

	return (
		<Component
			type={type}
			className={merge(
				'no-underline bg-slate-900 disabled:bg-slate-700 hover:bg-slate-700 focus-ring text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-white dark:disabled:bg-white/90 dark:hover:bg-white/90 dark:text-slate-900 dark:highlight-white/20',
				color === 'secondary' &&
					'bg-transparent hover:bg-white/20 text-slate-900 dark:bg-slate-950 dark:hover:bg-white/20 dark:text-white',
				variant === 'outlined' && 'border-2 border-slate-900 dark:border-white',
				className
			)}
			{...props}
		>
			{children}
		</Component>
	)
}

export default Button
