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
 * A smart error boundary that generates user friendly messages
 */
export function ErrorEnhancementBoundary({
	children,
	...rest
}: ErrorBoundaryProps) {
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

export default ErrorEnhancementBoundary
