'use client'
import type { HTMLAttributes } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'
import { Code } from '@/src/components/Code'
import { useCodeHighlighter } from '@/src/hooks/useCodeHighlighter'

export interface CodeHighlightProps extends HTMLAttributes<HTMLPreElement> {
	/** raw code contents */
	raw?: string
	/** markdown code */
	code?: string
	/** whether the copy button should be hidden */
	noCopy?: boolean
}

/**
 * Markdown code block that dynamically highlights code
 */
export const CodeHighlight = ({
	children,
	className,
	raw,
	code,
	noCopy,
	...props
}: CodeHighlightProps) => {
	const { data } = useCodeHighlighter(code)

	return (
		<Code
			className={merge('p-0', className)}
			raw={raw}
			noCopy={noCopy}
			dangerouslySetInnerHTML={{ __html: data }}
			{...props}
		/>
	)
}

export default CodeHighlight
