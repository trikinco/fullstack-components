import type { MDXComponents } from 'mdx/types'
import { defaultComponents } from './src/utils/markdown'

// This file is required to use @next/mdx in the `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
	// Allows customizing built-in components, e.g. to add styling.
	return {
		...defaultComponents,
		...components,
	}
}
