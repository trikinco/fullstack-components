import type { ReactNode, HTMLAttributes, ElementType } from 'react'
import type { AsComponent } from '@trikinco/fullstack-components'
import { merge } from '@trikinco/fullstack-components/utils'

export interface ProseProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode
}

export const defaultElement = 'div'

export default function Prose<C extends ElementType = typeof defaultElement>({
	as,
	children,
	className,
	...rest
}: AsComponent<C, ProseProps>) {
	const Component = as || defaultElement

	return (
		<Component
			className={merge(
				'prose w-full dark:prose-invert prose-h1:text-5xl prose-headings:scroll-mt-32 prose-h1:font-bold prose-h1:mb-3 mx-auto',
				className
			)}
			{...rest}
		>
			{children}
		</Component>
	)
}
