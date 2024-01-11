import type { ReactNode, HTMLAttributes, ElementType } from 'react'
import type { AsComponent } from '@trikinco/fullstack-components'
import { merge } from '@trikinco/fullstack-components/utils'

export interface ProseProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode
}

export const defaultElement = 'div'

export function Prose<C extends ElementType = typeof defaultElement>({
	as,
	children,
	className,
	...rest
}: AsComponent<C, ProseProps>) {
	const Component = as || defaultElement

	return (
		<Component
			className={merge(
				'w-full mx-auto prose dark:prose-invert',
				'prose-h1:text-3xl md:prose-h1:text-5xl prose-h1:mb-3 md:prose-h1:mb-6 lg:prose-h1:mb-8',
				'prose-headings:scroll-mt-32 prose-headings:text-pretty',
				'prose-code:break-words',
				'focus-visible:prose-a:outline focus-visible:prose-a:outline-2 focus-visible:prose-a:outline-offset-2 focus-visible:prose-a:rounded-sm',
				className
			)}
			{...rest}
		>
			{children}
		</Component>
	)
}

export default Prose
