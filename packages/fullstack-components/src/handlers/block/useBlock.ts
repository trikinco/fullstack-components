'use client'

import { useId, useRef, useEffect } from 'react'
import { fetchProcessedBlock } from './fetchers'

/**
 * Generates a React component based on a `prompt`.
 * Uses `createRoot` to mount the component to a browser DOM element assigned with the `id`.
 */
export function useBlock(
	/**
	 * A text description of the desired component.
	 * @example 'A footer with copyright for this year with the company name Acme'
	 */
	prompt: string,
	/**
	 * Callback when errors are thrown. Used to e.g show an error boundary.
	 * @example `(error) => showBoundary(error)`
	 */
	onError?: (
		/**
		 * The error object thrown by the Block.
		 */
		error: any
	) => void
) {
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
