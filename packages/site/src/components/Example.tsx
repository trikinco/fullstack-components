'use client'
import {
	useState,
	type HTMLAttributes,
	type ReactNode,
	type ElementType,
} from 'react'
import type { AsComponent } from '@trikinco/fullstack-components'
import { merge } from '@trikinco/fullstack-components/utils'
import Button from '@/src/components/Elements/Button'

export interface ExampleProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
	/** Label above the example output. Default: 'Live Example' */
	label?: string
	/** `lazy` requires user interaction to render the children */
	lazy?: boolean
	/** removes the `not-prose` className on the wrapper style fonts as prose  */
	isProse?: boolean
}

export const defaultElement = 'div'

/**
 * Showcase live examples of code output
 */
export const Example = <C extends ElementType = typeof defaultElement>({
	as,
	label = 'Live Example',
	lazy,
	children,
	isProse,
	className,
	...rest
}: AsComponent<C, ExampleProps>) => {
	const [shouldMount, setShouldMount] = useState(!lazy)
	const Component = as || defaultElement

	return (
		<div className="flex flex-col w-full">
			<p className="ml-3 mb-3 mt-6 text-sm font-bold font-mono">{label}</p>
			<Component
				className={merge(
					'bg-pattern w-full p-6 rounded-lg border border-slate-200 dark:border-white/10 overflow-auto -mb-6',
					!isProse && 'not-prose',
					className
				)}
				{...rest}
			>
				{shouldMount ? (
					children
				) : (
					<Button onClick={() => setShouldMount(true)}>Load example</Button>
				)}
			</Component>
		</div>
	)
}

export default Example
