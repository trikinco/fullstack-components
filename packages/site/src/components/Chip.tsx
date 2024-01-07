import type { HTMLAttributes, ReactNode } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'

export interface ChipProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
}

export const Chip = ({ children, className, ...rest }: ChipProps) => {
	return (
		<div
			className={merge(
				'inline-flex rounded-lg py-2 px-3.5 align-baseline font-sans text-xs font-bold leading-none text-gray-900 dark:text-white bg-white border-2 border-gray-200 dark:bg-gray-900 dark:border-gray-700',
				className
			)}
			{...rest}
		>
			<div className="mt-px truncate">{children}</div>
		</div>
	)
}

export default Chip
