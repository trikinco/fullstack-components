import { useState, useRef, useEffect, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import { ordinal } from '../utils/lang'
import type { RewriteOptions } from '../types/Text'

/**
 * Renders a react tree to an HTML string
 * @see {@link https://react.dev/reference/react-dom/server/renderToString#removing-rendertostring-from-the-client-code}
 */
export async function renderToString(element: ReactNode) {
	return new Promise((resolve) => {
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

export const useText = (options: RewriteOptions) => {
	const [content, setContent] = useState<{
		content: string[]
	} | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const didFetch = useRef(false)

	/**
	 * Placeholder for passing an error prompt to OpenAI and generating a user-friendly message
	 */
	async function fetchText(options: RewriteOptions) {
		setIsLoading(true)

		try {
			const grade =
				typeof options.grade === 'number'
					? `${ordinal(options.grade)}-grade`
					: options.grade
			const content = await renderToString(options.children)

			const response = await fetch('/api/text', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ...options, grade, content }),
			})

			const data = await response.json()

			if (response.status !== 200) {
				throw (
					data.error ||
					new Error(`Request failed with status ${response.status}`)
				)
			}

			const body = JSON.parse(data.result || {})
			setContent(body)
		} catch (error) {
			/**
			 * Continue handling other/fallback cases here
			 * @consideration flag for turning on navigator.onLine check when applicable for the application
			 */
			if (error instanceof Error && error.message) {
				console.error({
					message: error.message,
					stack: error.stack,
				})
			} else {
				console.error(error)
			}
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (!didFetch.current) {
			didFetch.current = true
			fetchText(options)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return {
		fetchText,
		content,
		isLoading,
	}
}
