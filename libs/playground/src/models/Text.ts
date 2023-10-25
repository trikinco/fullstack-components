import type { ReactNode } from 'react'
import type { Range } from './common'

export interface RewriteOptions {
	/** Content to rewrite. Plain text or HTML */
	children: ReactNode
	/** Count: The amount of alternative 'versions' of the rewritten content to output. Where any of the following parameters are arrays, the parameter applies to the output 'version' of the same index. */
	count?: number
	/** Unless the tone of voice is defined, the tone of the input content is matched as closely as possible. */
	tone?: string | string[]
	/** How heavily content is rewritten. This is a number or array of numbers from 0-100. 0 returns the original content, 100 completely rewrites the content. */
	strength?: Range<0, 100> | Range<0, 100>[]
	/** Readability level based school grades.  */
	grade?: number | string | (number | string)[]
	/** A loose combination of 'Strength' and 'Grade'. Higher numbers indicate shorter, more readable content, while allowing for greater creativity in rewriting the content. 0 returns the original content */
	// simplification?: number | number[]
	/** Max amount of output text characters, not counting HTML markup if present. */
	max?: number | number
	/** Minimum amount of output text characters, not counting HTML markup if present. */
	min?: number | number[]
}
