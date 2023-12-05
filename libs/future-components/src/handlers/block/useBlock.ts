'use client'

import { useId, useRef, useEffect } from 'react'
import { fetchProcessedBlock } from './fetchers'

/**
 * useBlock generates a React component based on a prompt
 * It uses `createRoot` to render it to an element with the returned `id`
 */
export const useBlock = (
	prompt: string,
	/** Callback when errors are thrown. e.g show an error boundary */
	onError?: (error: any) => void
) => {
	const id = useId()
	// Just for avoiding multiple API calls in strict mode - this isn't really needed
	const isEnabled = useRef(true)

	const loadBlock = async () => {
		try {
			await fetchProcessedBlock({ prompt, id })
		} catch (error) {
			console.error('something went wrong when loading block content', error)
			onError?.(error)
		}
	}

	useEffect(() => {
		if (isEnabled.current) {
			isEnabled.current = false
			void loadBlock()
		}

		return () => {
			isEnabled.current = false
		}
	}, [id, prompt])

	return { id, loadBlock }
}
