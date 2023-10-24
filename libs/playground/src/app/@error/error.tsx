'use client' // Error components must be Client Components

import { Suspense, useEffect } from 'react'
import { SmartError } from '../../components/SmartError'

/**
 * Error boundary with streaming
 */
export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
		<div>
			<h2>Something went wrong!</h2>
			<Suspense fallback={<p>Loading more error details...</p>}>
				<SmartError error={error} />
			</Suspense>
			<button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Try again
			</button>
		</div>
	)
}
