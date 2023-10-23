import type { HTMLAttributes, ReactNode } from 'react'
import { merge } from '../utils/styles'

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
	/**
	 * Button contents
	 */
	children?: ReactNode
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ className, children, ...props }: ButtonProps) => {
	return (
		<button
			type="button"
			className={merge(
				'bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400',
				className
			)}
			{...props}
		>
			{children}
		</button>
	)
}
