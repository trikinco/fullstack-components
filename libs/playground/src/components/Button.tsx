import type { ElementType, HTMLAttributes } from 'react'
import type { AsComponent } from '../types/AsComponent'
import { merge } from '../utils/styles'

export type ButtonProps = HTMLAttributes<HTMLButtonElement>
export const defaultElement = 'button'

/**
 * Primary UI component for user interaction
 */
export const Button = <C extends ElementType = typeof defaultElement>({
	as,
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
				'bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400',
				className
			)}
			{...props}
		>
			{children}
		</Component>
	)
}
