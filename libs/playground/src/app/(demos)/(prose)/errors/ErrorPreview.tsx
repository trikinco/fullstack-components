'use client'
import { ErrorBoundary } from '@/src/modules/ErrorBoundary'
import { Button } from '@/src/components/Button'
import { useState } from 'react'

export interface ErrorPreviewProps {
	/** Do something silly here to throw an error */
	onClick?: () => void
	label?: string
}

export function ErrorPreview({ label, onClick }: ErrorPreviewProps) {
	const [shouldRenderThrow, setShouldRenderThrow] = useState(false)

	// Throw an error in a component instead of rendering
	const ComponentToThrowError = () => {
		// Throw an error here
		onClick?.()

		return null
	}

	return (
		<ErrorBoundary>
			{shouldRenderThrow && <ComponentToThrowError />}

			<h3>{label}</h3>
			<Button
				className="my-8"
				onClick={() => {
					setShouldRenderThrow(true)
				}}
			>
				{label}
			</Button>
		</ErrorBoundary>
	)
}
