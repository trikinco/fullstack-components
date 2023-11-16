'use client'
import {
	ErrorBoundary as ReactErrorBoundary,
	type FallbackProps,
	type ErrorBoundaryProps as ReactErrorBoundaryProps,
} from 'react-error-boundary'
import { useRequest } from '@trikinco/fullstack-components/client'
import { Spinner } from '@/src/components/Spinner'
import { IS_DEV } from '@/src/utils/constants'

const errorAPIURLs = {
	message: '/api/error/message',
} as const

/**
 * The formatted user-friendly error message
 */
export interface UserErrorMessageContent {
	/** The summarised title for the error message */
	title: string
	/** The main body copy describing the error */
	message: string
}

export type ErrorBoundaryProps = Omit<
	ReactErrorBoundaryProps,
	'FallbackComponent' | 'fallbackRender'
>

export function FallbackComponent({
	error, //resetErrorBoundary,
}: FallbackProps) {
	// Call resetErrorBoundary() to reset the error boundary and retry the render.
	const { data, isLoading } = useRequest<UserErrorMessageContent>(
		errorAPIURLs.message,
		{ body: { message: error.message, stack: error.stack } }
	)

	return (
		<div role="alert">
			{isLoading && (
				<Spinner>Getting a detailed description of the error...</Spinner>
			)}

			{!isLoading && !!data && (
				<div>
					<p className="text-2xl font-bold mb-3 mt-0 block">{data.title}</p>
					<p>{data.message}</p>
				</div>
			)}

			<p className="text-lg font-bold"></p>

			<details>
				<summary>Technical details</summary>

				<p className="font-bold mb-2">Error message:</p>
				<pre className="bg-white/10 mb-4 block p-4 rounded-md border-2 border-white/50 break-all">
					{error.message}
				</pre>

				{IS_DEV && error.stack && (
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

/**
 * A smart error boundary that generates user friendly messages
 */
export function ErrorBoundary(props: ErrorBoundaryProps) {
	const { children } = props || {}

	return (
		<ReactErrorBoundary FallbackComponent={FallbackComponent}>
			{children}
		</ReactErrorBoundary>
	)
}
