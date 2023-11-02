import type { MDXComponents } from 'mdx/types'
import { CodeBlock } from './src/components/CodeBlock'

// This file is required to use @next/mdx in the `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
	// Allows customizing built-in components, e.g. to add styling.
	return {
		pre: CodeBlock,
		...components,
	}
}
