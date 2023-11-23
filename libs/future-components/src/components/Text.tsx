import type { ElementType, ReactNode, HTMLAttributes } from 'react'
import type { AsComponent } from '../types'
import type { TextProps as TextOptions } from '../handlers/text/models'
import { getText } from '../handlers/text/getters'

export interface TextProps
	extends Omit<TextOptions, 'content'>,
		HTMLAttributes<HTMLElement> {
	children?: ReactNode
}

export const defaultElement = 'div'

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
	const response = await getText({
		content: children || content,
		prompt,
		type,
		tone,
		strength,
		grade,
		max,
		min,
	})

	if (as) {
		const Component = as as 'div' | C
		return (
			<Component
				{...rest}
				// eslint-disable-next-line @typescript-eslint/naming-convention
				dangerouslySetInnerHTML={{ __html: response.content }}
			/>
		)
	}

	return <>{response?.content}</>
}

export default Text
