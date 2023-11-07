'use client'

import { useState, useRef, useEffect } from 'react'

export const useUi = (prompt: string) => {
	const [content, setContent] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const didFetch = useRef(false)

	/**
	 * Placeholder for passing an error prompt to OpenAI and generating a user-friendly message
	 */
	async function fetchUi(prompt: string) {
		setIsLoading(true)

		try {
			const response = await fetch('/api/ui', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ prompt }),
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
			fetchUi(prompt)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return {
		fetchUi,
		content,
		isLoading,
	}
}
