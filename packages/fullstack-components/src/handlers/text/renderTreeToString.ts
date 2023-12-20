import type { ReactNode } from 'react'

/**
 * Transforms a React tree to a HTML string.
 * Works both on the server and client.
 */
export async function renderTreeToString(content: ReactNode) {
	// Server only
	if (typeof window === 'undefined') {
		const { renderToStaticMarkup } = await import(
			'../../utils/renderToStaticMarkup'
		)
		return await renderToStaticMarkup(content)
	}
	// Client - for useText and client components
	else {
		const { renderToString } = await import('../../client/renderToString')
		return await renderToString(content)
	}
}
