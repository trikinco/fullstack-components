/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'
import type { HTMLAttributes, ReactNode } from 'react'
import type { FallbackProps } from 'react-error-boundary'
import { useErrorEnhancement } from '../handlers/errorEnhancer/useErrorEnhancement'
import { IS_DEV } from '../utils'

export interface ErrorEnhancementFallbackBaseProps
	extends HTMLAttributes<HTMLDivElement> {
	/** React tree to show while the error enhancement is loading */
	fallback?: ReactNode
	/** Additional context to pass to the error enhancement which may help with debugging */
	errorContext?: string
	/** Shows a button to reset the error boundary and retry the render */
	showResetBoundaryButton?: boolean
	/** Label to display inside the reset `<button>` when `showResetBoundary` is true  */
	resetBoundaryButtonLabel?: ReactNode
	/** Additional props to pass to the reset `<button>` */
	resetBoundaryButtonProps?: HTMLAttributes<HTMLButtonElement>
}

export type ErrorEnhancementFallbackProps = ErrorEnhancementFallbackBaseProps &
	FallbackProps

/**
 * A custom enhanced error fallback component to render inside a `react-error-boundary`
 */
export function ErrorEnhancementFallback({
	resetErrorBoundary,
	resetBoundaryButtonLabel = 'Reset',
	showResetBoundaryButton,
	resetBoundaryButtonProps,
	fallback,
	error,
	errorContext,
	...rest
}: ErrorEnhancementFallbackProps) {
	const { data, isLoading } = useErrorEnhancement({
		errorContext,
		errorMessage: error?.message,
		stackTrace: error?.stack,
	})

	return (
		<div role="alert" {...rest}>
			{isLoading && fallback}

			{!isLoading && data?.message && (
				<div>
					<p className="text-2xl font-bold mb-3 mt-0 block">{data.title}</p>
					<p>{data.message}</p>
				</div>
			)}

			{!isLoading && !!data?.developmentModeContext && (
				<div>
					<p>{data.developmentModeContext}</p>
				</div>
			)}

			{showResetBoundaryButton && (
				<button
					type="button"
					onClick={resetErrorBoundary}
					{...resetBoundaryButtonProps}
				>
					{resetBoundaryButtonLabel}
				</button>
			)}

			<details>
				<summary>Technical details</summary>

				<p className="font-bold mb-2">Error message:</p>
				<pre className="bg-white/10 mb-4 block p-4 rounded-md border-2 border-white/50 break-all">
					{error?.message}
				</pre>

				{IS_DEV && error?.stack && (
					<>
						<p className="font-bold mb-2">Error stack:</p>
						<pre className="bg-white/10 mb-4 block p-4 rounded-md border-2 border-white/50 break-all">
							{error.stack}
						</pre>
					</>
				)}
			</details>
		</div>
	)
}

export default ErrorEnhancementFallback
