import { merge } from '../../../../fullstack-components/dist/utils'
import type { DetailedHTMLProps, LabelHTMLAttributes } from 'react'

export type LabelProps = DetailedHTMLProps<
	LabelHTMLAttributes<HTMLLabelElement>,
	HTMLLabelElement
>

export function Label({ className, children, ...rest }: LabelProps) {
	return (
		<label
			className={merge('block mb-2 font-bold dark:text-white', className)}
			{...rest}
		>
			{children}
		</label>
	)
}

export default Label
