'use client'

import { useState, useRef, useEffect } from 'react'

export interface UseUIProps {
	prompt: string
	src?: string
	colors?: string
}

export const useUI = ({ prompt, src, colors }: UseUIProps) => {
	const [content, setContent] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const didFetch = useRef(false)

	/**
	 * Placeholder for passing an error prompt to OpenAI and generating a user-friendly message
	 */
	async function fetchUi({ prompt, src, colors }: UseUIProps) {
		setIsLoading(true)
		setIsError(false)

		try {
			const response = await fetch('/api/ui/page', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ prompt, src, colors }),
			})

			const data = await response.json()

			if (response.status !== 200) {
				throw (
					data.error ||
					new Error(`Request failed with status ${response.status}`)
				)
			}

			setContent(data.result || '')
		} catch (error) {
			setIsError(true)
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
			didFetch.current = false
		}
	}

	useEffect(() => {
		if (!didFetch.current && (prompt || src)) {
			didFetch.current = true
			fetchUi({ prompt, src, colors })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [prompt, src, colors])

	return {
		fetchUi,
		content,
		isLoading,
		isError,
	}
}
