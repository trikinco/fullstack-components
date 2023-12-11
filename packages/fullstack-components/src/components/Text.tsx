import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import type { AsComponent } from '../types'
import type { TextRequestBody, TextResponse } from '../handlers/text/models'
import { getText } from '../handlers/text/textClient'
import { renderTreeToString } from '../handlers/text/renderTreeToString'

/**
 * Text Server Component
 * @extends `Omit<TextRequestBody, 'content'>`
 * @extends `Omit<HTMLAttributes<HTMLElement>, 'content'>`
 */
export interface TextProps
	extends Omit<TextRequestBody, 'content'>,
		Omit<HTMLAttributes<HTMLElement>, 'content'> {
	/** Content to re/write. Plain text or a React tree. */
	content: ReactNode
}

const defaultElement = 'div'

/**
 * Text Server Component
 */
export async function Text<C extends ElementType = typeof defaultElement>({
	as,
	// Text options
	content,
	children,
	prompt,
	type,
	tone,
	strength,
	grade,
	max,
	min,
	// HTML attributes only
	...rest
}: AsComponent<C, TextProps>) {
	const stringContent = await renderTreeToString(children || content)
	const response = await getText({
		content: stringContent,
		prompt,
		type,
		tone,
		strength,
		grade,
		max,
		min,
	})
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const data: TextResponse = JSON.parse(response.responseText || '')

	if (as) {
		const Component = as as 'div' | C
		return (
			<Component
				{...rest}
				// eslint-disable-next-line @typescript-eslint/naming-convention
				dangerouslySetInnerHTML={{ __html: data.content }}
			/>
		)
	}

	return <>{data?.content}</>
}
