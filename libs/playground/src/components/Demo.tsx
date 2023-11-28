import type { HTMLAttributes, ReactNode, ElementType } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'

export interface DemoProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
	label?: ReactNode
	component?: ElementType
}

/**
 * Demo a live example of a feature
 */
export const Demo = ({
	label,
	children,
	className,
	component: TitleComponent = 'p',
	...rest
}: DemoProps) => {
	return (
		<>
			<TitleComponent className="ml-3 mb-3 mt-8 text-sm font-bold font-mono">
				{label}
			</TitleComponent>
			<div
				className={merge(
					'aspect-square bg-white grid place-content-center relative mb-12 p-6 overflow-auto text-black',
					className
				)}
				{...rest}
			>
				{children}
			</div>
		</>
	)
}

export default Demo
