import type { HTMLAttributes, ReactNode, ElementType } from 'react'
import { merge } from '../../../fullstack-components/dist/utils'

export interface DemoProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
	label?: ReactNode
	info?: ReactNode
	component?: ElementType
}

/**
 * Demo a live example of a feature
 */
export const Demo = ({
	label,
	info,
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
					'aspect-square bg-white flex justify-center relative mb-6 p-6 overflow-auto text-black',
					className
				)}
				{...rest}
			>
				<div className="my-auto max-w-full">{children}</div>
			</div>
			<div className="mb-12">{info}</div>
		</>
	)
}

export default Demo
