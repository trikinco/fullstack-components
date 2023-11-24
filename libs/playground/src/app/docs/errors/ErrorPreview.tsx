'use client'
import { ErrorEnhancementBoundary } from '@trikinco/fullstack-components/client'
import { Button } from '@/src/components/Button'
import { useState } from 'react'
import { Spinner } from '@/src/components/Spinner'

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
		<ErrorEnhancementBoundary
			fallback={
				<Spinner className="mb-3">
					Generating user-friendly error message
				</Spinner>
			}
			className="mb-6"
		>
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
		</ErrorEnhancementBoundary>
	)
}
