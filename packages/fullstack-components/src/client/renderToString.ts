'use client'
import type { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'

/**
 * Renders a react tree to an HTML string.
 * Uses `createRoot` and `flushSync` as `renderToString` from 'react-dom/server' is disallowed in next
 * @link https://react.dev/reference/react-dom/server/renderToString#removing-rendertostring-from-the-client-code
 * @note client version of `utils/renderToStaticMarkup`
 */
export async function renderToString(element: ReactNode) {
	return new Promise((resolve: (value: string) => void) => {
		const div = document.createElement('div')
		const root = createRoot(div)

		setTimeout(() => {
			flushSync(() => {
				root.render(element)
			})

			resolve(div.innerHTML)
		})
	})
}
