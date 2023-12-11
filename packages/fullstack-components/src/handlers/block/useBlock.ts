'use client'

import { useId, useRef, useEffect } from 'react'
import { fetchProcessedBlock } from './fetchers'

/**
 * useBlock generates a React component based on a prompt
 * It uses `createRoot` to render it to an element with the returned `id`
 */
export interface UseBlockParameters {
	/**
	 * A text description of the desired component.
	 */
	prompt: string
	/** Callback when errors are thrown. Used to e.g show an error boundary. */
	onError?: (error: any) => void
}

export const useBlock = (
	prompt: UseBlockParameters['prompt'],
	onError?: UseBlockParameters['onError']
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
