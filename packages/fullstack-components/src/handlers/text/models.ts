import type { ReactNode } from 'react'
import type { Range } from '../../types/helpers'

export interface TextRequestBody {
	/** A text string, stringified HTML or a stringified React tree of the content to re/write. */
	content?: string
	/** A text description of how to re/write the `content`. */
	prompt?: string
	/**
	 * Enforce a content type for the output.
	 * Can be used to transform from one type to another.
	 * If not defined, the content type should match the input.
	 */
	type?: 'text' | 'markdown' | 'HTML'
	/**
	 * A text description defining the tone of voice of the content.
	 * If not defined, the tone of the input content is matched as closely as possible.
	 */
	tone?: string
	/**
	 * A number between 0-100 of how heavily the content is modified.
	 * 0 returns the original content, 100 completely rewrites the content.
	 */
	strength?: Range<0, 100>
	/**
	 * A number based school grades setting the readability level.
	 * Higher numbers creates more complex text which is harder to read.
	 * Lower numbers creates more readable text using simpler words.
	 */
	grade?: number | string
	/**
	 * A number or the *desired* max amount of output text characters, not counting HTML markup if present.
	 * @note Results vary and may subceed or exceed the desired amount of characters.
	 */
	max?: number
	/**
	 * A number of the *desired* minimum amount of output text characters, not counting HTML markup if present.
	 * @note Results vary and may subceed or exceed the desired amount of characters.
	 */
	min?: number
}

/**
 * Text component and hook props
 * @extends Omit<TextRequestBody, 'content'>
 */
export interface TextParameters extends Omit<TextRequestBody, 'content'> {
	/** Content to re/write. Plain text or a React tree. */
	content: ReactNode
}

export type TextOptions = {
	/**
	 * @default `process.env.OPENAI_API_KEY`.
	 */
	openAiApiKey?: string
}

export type TextResponse = {
	/** The format of `content`. */
	type: 'text' | 'markdown' | 'HTML'
	/** The re/written content stringified as the `type`. */
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
