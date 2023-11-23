'use client'
import { useState } from 'react'
import { Spinner } from '@/src/components/Spinner'
import { Button } from '@/src/components/Button'

/**
 * The formatted user-friendly error message
 */
export interface UserErrorMessageContent {
	/** The summarised title for the error message */
	title: string
	/** The main body copy describing the error */
	message: string
}

export interface ErrorPreviewProps {
	/** HTTP status code error to imitate */
	status?: number
}

export function ErrorHTTPPreview({ status = 500 }: ErrorPreviewProps) {
	// const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	/** Formatted error message */
	const [content, setContent] = useState<UserErrorMessageContent | null>()
	/** The raw error */
	const [error, setError] = useState<Error | null>()

	/**
	 * Placeholder for generating some generic errors
	 */
	async function handleError(status = 500) {
		setIsLoading(true)

		try {
			const response = await fetch('/api/error/mock', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ status }),
			})

			if (!response.ok) {
				throw new Error(
					`Error: the server responded with a status of ${response.status} (${response.statusText})`
				)
			}
		} catch (error) {
			return await fetchErrorMessage(error as Error)
		}
	}

	/**
	 * Placeholder for passing an error prompt to OpenAI and generating a user-friendly message
	 */
	async function fetchErrorMessage(error: Error) {
		setError(error)

		try {
			const response = await fetch('/api/error/message', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ message: error.message, stack: error.stack }),
			})

			const data = await response.json()

			if (response.status !== 200) {
				throw (
					data.error ||
					new Error(`Request failed with status ${response.status}`)
				)
			}

			setContent(data)
		} catch (error) {
			/**
			 * Continue handling other/fallback cases here
			 * @consideration flag for turning on navigator.onLine check when applicable for the application
			 */
			if (error instanceof Error && error.message) {
				console.error({
					message: error.message,
					stack: error.stack,
				})
			} else {
				console.error(error)
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<div className="flex flex-col gap-8">
				{error && (
					<>
						<div>
							<p className="font-bold mb-2">Error message:</p>
							<pre className="bg-white/10 mb-4 block p-4 rounded-md border-2 border-white/50 break-all">
								{error?.message}
							</pre>
						</div>

						<div>
							<p className="font-bold mb-2">Error stack:</p>
							<pre className="bg-white/10 mb-4 block p-4 rounded-md border-2 border-white/50 break-all">
								{error?.stack}
							</pre>
						</div>
					</>
				)}
				{!isLoading && content && (
					<div>
						<h2 className="text-2xl font-bold mb-3 mt-0 block">
							{content?.title}
						</h2>
						<p>{content?.message}</p>
					</div>
				)}
				{isLoading && <Spinner>Generating user-friendly error message</Spinner>}
			</div>

			<Button className="mt-8" onClick={() => handleError(status)}>
				{status} error
			</Button>
		</>
	)
}
