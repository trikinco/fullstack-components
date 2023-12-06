'use client'
import { useState } from 'react'
import { Spinner } from '@/src/components/Spinner'
import { Example } from '@/src/components/Example'
import { Button } from '@/src/components/Elements/Button'
import { useErrorEnhancement } from '../../../../../fullstack-components/dist/client'

export interface ErrorPreviewProps {
	/** HTTP status code error to imitate */
	status?: number
	/** Label to pass to the Example */
	label?: string
}

const getErrorTextFromStatus = (status?: number) => {
	switch (status) {
		case 400:
			return 'Bad Request'
		case 401:
			return 'Unauthorized'
		case 403:
			return 'Forbidden'
		case 404:
			return 'Not Found'
		case 503:
			return 'Service Unavailable'
		case 500:
		default:
			return 'Internal Server Error'
	}
}

export function ErrorHTTPPreview({ label, status = 500 }: ErrorPreviewProps) {
	/** The raw error */
	const [error, setError] = useState<Error | null>()
	const { isLoading, data } = useErrorEnhancement(
		{
			errorMessage: error?.message,
			stackTrace: error?.stack,
		},
		{ isEnabled: !!error }
	)

	/**
	 * Placeholder for generating some generic errors
	 */
	function handleError(status = 500) {
		try {
			throw new Error(
				`Error: the server responded with a status of ${status} (${getErrorTextFromStatus(
					status
				)})`,
				{
					cause: 'NetworkError',
				}
			)
		} catch (error) {
			if (error instanceof Error && error.message) {
				setError(error)
			} else {
				console.error(error)
			}
		}
	}

	return (
		<Example className="mb-3 gap-6" label={label}>
			<div className="flex flex-col gap-8">
				{isLoading && <Spinner>Generating user-friendly error message</Spinner>}

				{!isLoading && data && (
					<div>
						<h2 className="text-2xl font-bold mb-3 mt-0 block">
							{data?.title}
						</h2>
						<p>{data?.message}</p>
						<p>{data?.developmentModeContext}</p>
					</div>
				)}

				{error && (
					<>
						<div>
							<p className="font-bold mb-2">Error message:</p>
							<pre className="text-black dark:text-white bg-white/10 mb-4 block p-4 rounded-md border-2 border-black/20 dark:border-white/50 break-all overflow-auto">
								{error?.message}
							</pre>
						</div>

						<div>
							<p className="font-bold mb-2">Error stack:</p>
							<pre className="text-black dark:text-white bg-white/10 mb-4 block p-4 rounded-md border-2 border-black/20 dark:border-white/50 break-all overflow-auto">
								{error?.stack}
							</pre>
						</div>
					</>
				)}
			</div>

			<Button onClick={() => handleError(status)}>
				Trigger {status} error
			</Button>
		</Example>
	)
}
