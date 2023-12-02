import type { HTMLAttributes, ReactNode } from 'react'
import { ButtonCopy } from './ButtonCopy'
import { merge } from '@trikinco/fullstack-components/utils'

export interface CodeBlockProps extends HTMLAttributes<HTMLPreElement> {
	children?: ReactNode
	/** raw node contents */
	raw?: string
	/** whether the copy button should be hidden */
	noCopy?: boolean
}

/**
 * Markdown code block with a copy button
 * @see `next.config` for custom rehype setup for this
 */
export const CodeBlock = ({
	children,
	className,
	raw,
	noCopy,
	...props
}: CodeBlockProps) => {
	return (
		<div className="group">
			<pre
				className={merge(
					'not-prose [font-variant-ligatures:none] p-5 overflow-auto',
					className
				)}
				{...props}
			>
				{children}
			</pre>

			{!!noCopy && (
				<ButtonCopy
					className="absolute top-4 right-4 invisible group-hover:visible group-focus-within:visible focus:visible"
					text={raw}
					data-copy
				/>
			)}
		</div>
	)
}
