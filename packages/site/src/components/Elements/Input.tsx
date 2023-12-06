import { merge } from '../../../../fullstack-components/dist/utils'
import type { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export type InputProps = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>

export function Input({ className, ...rest }: InputProps) {
	return (
		<input
			className={merge(
				'p-3 rounded-md border text-black bg-white dark:text-white dark:bg-slate-800 border-white/10 w-full focus-ring',
				className
			)}
			type="text"
			{...rest}
		/>
	)
}

export default Input
