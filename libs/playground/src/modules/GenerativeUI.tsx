import { Chip } from '@/src/components/Chip'
import { IconRefresh } from '@/src/components/Icons/IconRefresh'
import { Spinner } from '@/src/components/Spinner'
import { ErrorBoundary } from 'react-error-boundary'

export interface GenerativeUIProps {
	refetch: () => void
	prompt: string
	/** The generated HTML content to preview in the iframe */
	content: string
	isLoading?: boolean
	isError?: boolean
}

export function GenerativeUI({
	refetch,
	prompt,
	content,
	isLoading,
	isError,
}: GenerativeUIProps) {
	return (
		<>
			<div className="w-full h-full aspect-square md:aspect-video overflow-hidden bg-white rounded-lg">
				{!isLoading && content && (
					<ErrorBoundary
						fallback={
							<div className="h-full grid place-items-center text-slate-900">
								Something went wront while generating &quot;{prompt}&quot;
							</div>
						}
					>
						<iframe
							id="preview"
							title={prompt}
							/**
							 * This is just a POC.
							 * To truly be sandboxed, the iframe should likely
							 * consume an `src` doc from another domain, otherwise
							 * `allow-same-origin` and `allow-scripts` may still
							 * allow for breaking out of the sandbox
							 */
							sandbox="allow-same-origin allow-scripts allow-modals allow-popups allow-presentation allow-downloads allow-pointer-lock"
							className="w-full h-full border-0 min-h-0 overflow-auto opacity-100 z-10 select-auto pointer-events-auto"
							srcDoc={content}
						/>
					</ErrorBoundary>
				)}

				{isLoading && !isError && (
					<div className="h-full grid place-items-center text-slate-900">
						<Spinner classNameSpinner="mx-auto">
							Handling UI generation prompt for &quot;{prompt}&quot;
						</Spinner>
					</div>
				)}

				{!isLoading && isError && (
					<div className="h-full grid place-items-center text-slate-900">
						Error generating UI for &quot;{prompt}&quot;
					</div>
				)}
			</div>

			<div className="flex gap-3">
				<button
					disabled={isLoading}
					aria-label={`Regenerate "${prompt}"`}
					className="mt-3 flex items-center justify-center w-9 h-9 text-xs font-medium text-gray-900 bg-white border-2 border-gray-200 rounded-lg toggle-full-view hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-900 focus:outline-none dark:text-gray-400 dark:border-gray-700 dark:hover:text-white dark:hover:bg-gray-800"
					onClick={() => refetch()}
				>
					<IconRefresh />
				</button>
				<Chip className="mt-3 capitalize">{prompt}</Chip>
			</div>
		</>
	)
}
