import { merge } from '@trikinco/fullstack-components/utils'
import type { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export type InputProps = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>

export function Input({ className, ...rest }: InputProps) {
	return (
		<input
			className={merge(
				'p-3 rounded-md w-full focus-ring',
				'border border-slate-100 dark:border-white/10',
				'bg-white dark:bg-slate-800',
				'text-black dark:text-white',
				className
			)}
			type="text"
			{...rest}
		/>
	)
}

export default Input
