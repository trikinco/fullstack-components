import type { HTMLAttributes, ReactNode, ElementType } from 'react'
import type { AsComponent } from '@trikinco/fullstack-components'
import { merge } from '@trikinco/fullstack-components/utils'

export interface ExampleProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
	/** Label above the example output. Default: 'Live Example' */
	label?: string
}

export const defaultElement = 'div'

/**
 * Showcase live examples of code output
 */
export const Example = <C extends ElementType = typeof defaultElement>({
	as,
	label = 'Live Example',
	children,
	className,
	...rest
}: AsComponent<C, ExampleProps>) => {
	const Component = as || defaultElement

	return (
		<div className="flex flex-col w-full">
			<p className="ml-3 mb-3 mt-6 text-sm font-bold font-mono">{label}</p>
			<Component
				className={merge(
					'not-prose bg-pattern w-full p-6 rounded-lg border border-slate-200 dark:border-white/10 overflow-auto -mb-6',
					className
				)}
				{...rest}
			>
				{children}
			</Component>
		</div>
	)
}
