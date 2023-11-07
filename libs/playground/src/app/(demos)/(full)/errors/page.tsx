'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageHeader } from '@/src/components/PageHeader'
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

export default function Home() {
	const router = useRouter()
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
			const response = await fetch('/api/error', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ status }),
			})

			/**
			 * 'redirect' to /error, but continue processing
			 * since /error is a parallel route (handled by `app/@error`) which is always rendered
			 * by `app/layout`, it will now appear
			 */
			if (response.redirected && response.url) {
				router.push('/error')
			}

			if (!response.ok) {
				throw new Error(
					`Failed to load resource: the server responded with a status of ${response.status} (${response.statusText})`
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
			const response = await fetch('/api/message', {
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

			const body = JSON.parse(data.result || {})

			setContent(body)
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
			<PageHeader title="Error" />

			{isLoading && <Spinner />}

			<div className="grid gap-12 grid-cols-2">
				{error && (
					<div className="mb-32 max-w-lg">
						<p className="font-bold mb-2">Error message:</p>
						<code className="bg-white/10 mb-4 block p-4 rounded-md border-2 border-white/50">
							{error?.message}
						</code>

						<p className="font-bold mb-2">Error stack:</p>
						<code className="bg-white/10 mb-4 block p-4 rounded-md border-2 border-white/50">
							{error?.stack}
						</code>
					</div>
				)}

				{content && (
					<div className="mb-32 max-w-lg">
						<h2 className="text-2xl font-bold mb-3 block">{content?.title}</h2>
						<p>{content?.message}</p>
					</div>
				)}
			</div>

			<div className="mb-32 flex gap-4 w-full max-w-prose">
				<Button onClick={() => handleError()}>500 error</Button>
				<Button onClick={() => handleError(400)}>400 error</Button>
			</div>
		</>
	)
}
