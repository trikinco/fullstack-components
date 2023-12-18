import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import type { AsComponent } from '../types'
import type { TextResponse } from '../handlers/text/models'
import type { Range } from '../types/helpers'
import { getText } from '../handlers/text/textClient'
import { renderTreeToString } from '../handlers/text/renderTreeToString'

type HTMLAttributesWithoutContent = Omit<HTMLAttributes<HTMLElement>, 'content'>

/**
 * Props to pass to the `<Text>` Server Component.
 * @extends Omit<HTMLAttributes<HTMLElement>, 'content'>
 * @link TextRequestBody
 */
export interface TextProps extends HTMLAttributesWithoutContent {
	/**
	 * A text string or a React tree with content to re/write. `children` takes precedence over `content` and accepts the same types.
	 * @example `<Title>Quantum formalism and the uncertainty principle</Title>`
	 */
	content?: ReactNode
	/**
	 * A text description of how to re/write the `content`.
	 * @example 'Summarize the following text in a single, simple sentence.'
	 */
	prompt?: string
	/**
	 * Enforce a content type for the output.
	 * Can be used to transform from one type to another. If not defined, the content type should match the input.
	 * @example 'markdown'
	 */
	type?: 'text' | 'markdown' | 'HTML'
	/**
	 * A text description defining the tone of voice of the content.
	 * If not defined, the tone of the input content is matched as closely as possible.
	 * @example 'friendly and whimsical'
	 */
	tone?: string
	/**
	 * A number between 0-100 of how heavily the content is modified.
	 * 0 returns the original content, 100 completely rewrites the content.
	 * @example 50
	 */
	strength?: Range<0, 100>
	/**
	 * A number or string that sets the readability level based on school grades.
	 * Higher numbers creates more complex and harder to read text.
	 * Lower numbers creates more readable text with simpler words.
	 * @example 5
	 * @example '5th-grade'
	 */
	grade?: number | string
	/**
	 * A number or the *desired* max amount of output text characters, not counting HTML markup if present.
	 * @note Results vary and may subceed or exceed the desired amount of characters.
	 * @example 1000
	 */
	max?: number
	/**
	 * A number of the *desired* minimum amount of output text characters, not counting HTML markup if present.
	 * @note Results vary and may subceed or exceed the desired amount of characters.
	 * @example 100
	 */
	min?: number
}

const defaultElement = 'div'

/**
 * Text Server Component that rewrites its children or `content` prop.
 * @extends Omit<TextRequestBody, 'content'> Omit<HTMLAttributes<HTMLElement>, 'content'>
 * @link TextRequestBody
 */
export async function Text<C extends ElementType = typeof defaultElement>(
	/**
	 * @link TextProps
	 * @example `as` usage `<Text tone="Ominous" type="HTML" as="div" className="mb-3">Hello friend</Text>`
	 */
	props: AsComponent<C, TextProps>
) {
	const {
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
	} = props || {}
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
	const { content: text = '' }: TextResponse = JSON.parse(
		response.responseText || '{}'
	)

	if (as) {
		const Component = as as 'div' | C
		return (
			<Component
				{...rest}
				// eslint-disable-next-line @typescript-eslint/naming-convention
				dangerouslySetInnerHTML={{ __html: text }}
			/>
		)
	}

	return <>{text}</>
}
