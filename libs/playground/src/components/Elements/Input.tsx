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
				'p-3 rounded-md border border-white/10 w-full focus-ring',
				className
			)}
			type="text"
			{...rest}
		/>
	)
}

export default Input
