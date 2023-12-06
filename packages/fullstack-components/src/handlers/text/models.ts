import type { ReactNode } from 'react'
import type { Range } from '../../types/helpers'

export type TextTypes = 'text' | 'markdown' | 'HTML'

export class TextRequestBody {
	/** Content to rewrite */
	content?: string
	/** Instructions on how to re/write the content */
	prompt?: string
	/**
	 * Enforce a content type for the output.
	 * Can be used to transform from one type to another.
	 * If not defined, the content type should match the input.
	 */
	type?: TextTypes
	/**
	 * Sets the tone of voice of the output.
	 * If not defined, the tone of the input content is matched as closely as possible.
	 */
	tone?: string
	/**
	 * How heavily content is rewritten.
	 * This is a number or array of numbers from 0-100.
	 * 0 returns the original content, 100 completely rewrites the content.
	 */
	strength?: Range<0, 100>
	/** Readability level based school grades.  */
	grade?: number | string
	/** Max amount of output text characters, not counting HTML markup if present. */
	max?: number
	/** Minimum amount of output text characters, not counting HTML markup if present. */
	min?: number
}

export interface TextProps extends Omit<TextRequestBody, 'content'> {
	/** Content to rewrite. Plain text or a react tree */
	content: ReactNode
}

export type TextOptions = {
	openAiApiKey?: string
}

export type TextResponse = {
	type: TextTypes
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
