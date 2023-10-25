import { useState, useRef, useEffect, type ReactElement } from 'react'
import type { RewriteOptions } from '../models/Text'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import { renderToStaticMarkup } from 'react-dom/server'

export interface UseTextProps extends RewriteOptions {
	enabled?: boolean
}

export const useText = ({ enabled, ...options }: UseTextProps) => {
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
			const content = renderToStaticMarkup(options.children as ReactElement)

			const response = await fetch('/api/text', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ...options, content }),
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
	}, [])

	return {
		fetchText,
		content,
		isLoading,
	}
}
