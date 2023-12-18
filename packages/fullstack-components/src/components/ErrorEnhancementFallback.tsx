/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/naming-convention */
'use client'
import type { HTMLAttributes, ReactNode } from 'react'
import type { FallbackProps } from 'react-error-boundary'
import { useErrorEnhancement } from '../handlers/errorEnhancer/useErrorEnhancement'
import { IS_DEV } from '../utils'

/**
 * The fallback component to show in the error boundary when an error is thrown.
 * @extends HTMLAttributes<HTMLDivElement> & FallbackProps
 * @link https://www.npmjs.com/package/react-error-boundary `react-error-boundary` for `FallbackProps` type information.
 */
export interface ErrorEnhancementFallbackProps
	extends HTMLAttributes<HTMLDivElement>,
		FallbackProps {
	/** React tree to show while the error enhancement is loading. */
	fallback?: ReactNode
	/** Additional context to pass to the error enhancement which may help with debugging. */
	errorContext?: string
	/** Shows a button to reset the error boundary and retry the render. */
	showResetBoundaryButton?: boolean
	/** Label to display inside the reset `<button>` when `showResetBoundaryButton` is true.  */
	resetBoundaryButtonLabel?: ReactNode
	/** Additional props to pass to the reset `<button>`. */
	resetBoundaryButtonProps?: HTMLAttributes<HTMLButtonElement>
}

/**
 * A custom enhanced error fallback Client Component to render inside a `react-error-boundary`.
 * Consumes `useErrorEnhancement` under the hood to generate the messages, then renders the UI to display them.
 */
export function ErrorEnhancementFallback(
	/**
	 * @link ErrorEnhancementFallbackProps
	 */
	props: ErrorEnhancementFallbackProps
) {
	const {
		resetErrorBoundary,
		resetBoundaryButtonLabel = 'Reset',
		showResetBoundaryButton,
		resetBoundaryButtonProps,
		fallback,
		error,
		errorContext,
		...rest
	} = props || {}
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

			<details className="mt-3">
				<summary>Technical details</summary>

				<p className="font-bold mb-2">Error message:</p>
				<pre className="bg-white/10 mb-4 block p-4 rounded-md border-2 break-all border-black/20 dark:border-white/50 break-all overflow-auto">
					{error?.message}
				</pre>

				{IS_DEV && error?.stack && (
					<>
						<p className="font-bold mb-2">Error stack:</p>
						<pre className="bg-white/10 mb-4 block p-4 rounded-md border-2 break-all border-black/20 dark:border-white/50 break-all overflow-auto">
							{error.stack}
						</pre>
					</>
				)}
			</details>
		</div>
	)
}
