'use client'

import { useState } from 'react'
import { ErrorEnhancementBoundary } from '../../../../../fullstack-components/dist/client'
import { Button } from '@/src/components/Elements/Button'
import { Spinner } from '@/src/components/Spinner'
import { Example } from '@/src/components/Example'

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
		<Example label={`Live Example · ${label}`} className="mb-3">
			<ErrorEnhancementBoundary
				fallback={
					<Spinner className="mb-3">
						Generating user-friendly error message
					</Spinner>
				}
			>
				{shouldRenderThrow && <ComponentToThrowError />}

				<Button
					onClick={() => {
						setShouldRenderThrow(true)
					}}
				>
					Trigger {label}
				</Button>
			</ErrorEnhancementBoundary>
		</Example>
	)
}
