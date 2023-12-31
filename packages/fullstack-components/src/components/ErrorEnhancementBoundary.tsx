'use client'

import {
	ErrorBoundary as ReactErrorBoundary,
	type ErrorBoundaryProps as ReactErrorBoundaryProps,
} from 'react-error-boundary'
import {
	ErrorEnhancementFallback,
	type ErrorEnhancementFallbackProps,
} from './ErrorEnhancementFallback'

export type ErrorBoundaryProps = Omit<
	ReactErrorBoundaryProps,
	'FallbackComponent' | 'fallbackRender'
> &
	Omit<ErrorEnhancementFallbackProps, 'error' | 'resetErrorBoundary'>

/**
 * A smart error boundary Client Component that generates and displays user friendly messages.
 * Consumes `useErrorEnhancement` and `ErrorEnhancementFallback` under the hood to generate and display the messages.
 */
export function ErrorEnhancementBoundary(
	/**
	 * @link ErrorEnhancementFallbackProps
	 */
	props: ErrorBoundaryProps
) {
	const { children, ...rest } = props || {}
	return (
		<ReactErrorBoundary
			fallbackRender={({ error, resetErrorBoundary }) => (
				<ErrorEnhancementFallback
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					error={error}
					resetErrorBoundary={resetErrorBoundary}
					{...rest}
				/>
			)}
		>
			{children}
		</ReactErrorBoundary>
	)
}
