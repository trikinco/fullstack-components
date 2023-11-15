'use client'

import { useRef, useLayoutEffect, type KeyboardEvent } from 'react'

export interface UseAutoSizeProps {
	input: string
	minRows?: number
	maxRows?: number
}

/**
 * Auto sizes a texarea while typing
 */
export function useAutoSize({
	input,
	minRows = 1,
	maxRows = 10,
}: UseAutoSizeProps) {
	const formRef = useRef<HTMLFormElement>(null)
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const textareaShadowRef = useRef<HTMLTextAreaElement>(null)
	const minHeightRef = useRef(minRows)

	// Auto size the textarea
	useLayoutEffect(() => {
		if (
			!textareaRef.current ||
			!textareaShadowRef.current ||
			!minHeightRef.current
		)
			return

		// The height of a single row - dependent on styling & font & font size
		minHeightRef.current = textareaShadowRef.current.scrollHeight || minRows
		// Reset height - important to shrink on delete
		textareaRef.current.style.height = 'inherit'
		// Set heights
		textareaRef.current.style.height = `${Math.max(
			textareaRef.current.scrollHeight,
			minHeightRef.current
		)}px`
		textareaRef.current.style.minHeight = `${minHeightRef.current}px`
		textareaRef.current.style.maxHeight = `${minHeightRef.current * maxRows}px`
	}, [input, minRows, maxRows])

	// Submit when hitting enter - unless shift is not pressed
	const commentEnterSubmit = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (!formRef.current || !textareaRef.current) return

		if (
			event.key === 'Enter' &&
			!event.shiftKey &&
			!event.nativeEvent.isComposing
		) {
			formRef.current.requestSubmit()

			// Reset height - important to shrink immediately on submit when clearing the value
			textareaRef.current.style.height = 'inherit'
		}
	}

	return {
		minRows,
		maxRows,
		formRef,
		textareaRef,
		textareaShadowRef,
		minHeightRef,
		commentEnterSubmit,
	}
}
