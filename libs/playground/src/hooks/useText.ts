import { useState, useRef, useEffect, type ReactElement } from 'react'
import type { RewriteOptions } from '../models/Text'
import { renderToStaticMarkup } from 'react-dom/server'
import { ordinal } from '../utils/lang'

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
			const content = renderToStaticMarkup(options.children as any)

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
