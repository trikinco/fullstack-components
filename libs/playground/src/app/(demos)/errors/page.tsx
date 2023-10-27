'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
		<main className="flex flex-col items-center justify-between p-24">
			<h1 className="text-3xl mb-16">
				<code>Error messages</code> demo
			</h1>

			{isLoading && (
				<div role="status">
					<svg
						aria-hidden="true"
						className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 dark:fill-white"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"
						/>
					</svg>
					<span className="sr-only">Loading...</span>
				</div>
			)}

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

			<div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
				<button
					onClick={() => handleError()}
					className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
				>
					<h2 className={`mb-3 text-2xl font-semibold`}>
						Generate 500 error{' '}
						<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
							-&gt;
						</span>
					</h2>
				</button>

				<button
					onClick={() => handleError(400)}
					className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
				>
					<h2 className={`mb-3 text-2xl font-semibold`}>
						Generate 400 error{' '}
						<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
							-&gt;
						</span>
					</h2>
				</button>
			</div>
		</main>
	)
}
