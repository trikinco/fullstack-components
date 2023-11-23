'use client'

import { useId, useRef, useEffect } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import { getBlock } from './getters'

/**
 * useBlock generates a React component based on a prompt
 * It uses `createRoot` to render it to an element with the returned `id`
 */
export const useBlock = (prompt: string) => {
	const id = useId()
	// Just for avoiding multiple API calls in strict mode - this isn't really needed
	const isEnabled = useRef(true)
	const { showBoundary } = useErrorBoundary()

	const loadBlock = async () => {
		try {
			await getBlock(prompt, id)
		} catch (error) {
			console.error('something went wrong when loading block content', error)
			showBoundary(error)
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
