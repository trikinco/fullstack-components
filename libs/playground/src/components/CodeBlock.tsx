import type { HTMLAttributes, ReactNode } from 'react'
import { ButtonCopy } from './ButtonCopy'
import { merge } from '../utils/styles'

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
		<>
			{!!noCopy && (
				<ButtonCopy className="absolute top-4 right-4" text={raw} data-copy />
			)}

			<pre
				className={merge('not-prose p-5 overflow-auto', className)}
				{...props}
			>
				{children}
			</pre>
		</>
	)
}
