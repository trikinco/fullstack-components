import type { ReactNode, HTMLAttributes } from 'react'
import { merge } from '../utils/styles'

export interface ProseProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode
}

export default function Prose({ children, className, ...rest }: ProseProps) {
	return (
		<div
			className={merge(
				'prose w-full dark:prose-invert prose-h1:text-5xl prose-h1:font-bold prose-h1:mb-3 mx-auto',
				className
			)}
			{...rest}
		>
			{children}
		</div>
	)
}
