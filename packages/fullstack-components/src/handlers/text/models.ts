import type { ReactNode } from 'react'
import type { Range } from '../../types/helpers'

export interface TextRequestBody {
	/**
	 * A text string, stringified HTML or a stringified React tree of the content to re/write.
	 * @note If a React tree is provided, use `fetchText`, `useText` or manually transform the tree to a HTML string.
	 * @example 'Quantum formalism and the uncertainty principle'
	 */
	content?: string
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

/**
 * Text component and hook props.
 * @link TextRequestBody
 * @extends TextRequestBody
 */
export interface TextParameters extends Omit<TextRequestBody, 'content'> {
	/**
	 * Content to re/write. Plain text or a React tree.
	 * @note If a React tree is provided, use `fetchText`, `useText` or manually transform the tree to a HTML string.
	 * @example `<Title>Quantum formalism and the uncertainty principle</Title>`
	 */
	content: ReactNode
}

export type TextOptions = {
	/**
	 * @default `process.env.OPENAI_API_KEY`.
	 */
	openAiApiKey?: string
}

export interface TextResponse {
	/**
	 * The content type of the re/written content.
	 * @example 'HTML'
	 */
	type: 'text' | 'markdown' | 'HTML'
	/**
	 * The re/written content.
	 * @example '<h1>Quantum formalism and the uncertainty principle</h1>'
	 */
	content: string
}

export class TextError extends Error {
	public rootCause: string

	constructor(error: any) {
		super('Error running text')
		this.name = 'TextError'
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.rootCause = error.message
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.stack = error.stack
	}
}
