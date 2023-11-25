import { Chip } from '@/src/components/Chip'
import { IconRefresh } from '@/src/components/Icons/IconRefresh'
import { Spinner } from '@/src/components/Spinner'
import { ErrorBoundary } from 'react-error-boundary'

export interface HTMLPageProps {
	refetch: () => void
	prompt?: string
	src?: string
	/** The generated HTML content to preview in the iframe */
	data?: string
	isLoading?: boolean
	isError?: boolean
}

/**
 * HTML page preview in an iframe
 */
export function HTMLPage({
	refetch,
	prompt,
	src,
	data,
	isLoading,
	isError,
}: HTMLPageProps) {
	return (
		<div className="w-full h-full xl:w-auto xl:-mx-10 2xl:-mx-28">
			<div className="aspect-square md:aspect-video overflow-hidden bg-white rounded-lg shadow-lg">
				{!isLoading && !isError && !data && (
					<label
						htmlFor="prompt"
						className="h-full grid place-items-center text-slate-900"
					>
						Tell me what you&apos;d like to make ✨
					</label>
				)}

				{!isLoading && data && (
					<ErrorBoundary
						fallback={
							<div className="h-full grid place-items-center text-slate-900">
								Something went wrong while creating &quot;{prompt || src}
								&quot;
							</div>
						}
					>
						<iframe
							id="preview"
							title={prompt || src}
							/**
							 * This is just a POC.
							 * To truly be sandboxed, the iframe should likely
							 * consume an `src` doc from another domain, otherwise
							 * `allow-same-origin` and `allow-scripts` may still
							 * allow for breaking out of the sandbox
							 */
							sandbox="allow-same-origin allow-scripts allow-modals allow-popups allow-presentation allow-downloads allow-pointer-lock"
							className="w-full h-full border-0 min-h-0 overflow-auto opacity-100 z-10 select-auto pointer-events-auto"
							srcDoc={data}
						/>
					</ErrorBoundary>
				)}

				{isLoading && !isError && (
					<div className="h-full grid place-items-center text-slate-900">
						<Spinner classNameSpinner="mx-auto">
							Creating &quot;{prompt || src}&quot;
						</Spinner>
					</div>
				)}

				{!isLoading && isError && (
					<div className="h-full grid place-items-center text-slate-900">
						Error creating &quot;{prompt || src}&quot;
					</div>
				)}
			</div>

			<div className="flex gap-3">
				<button
					disabled={isLoading}
					aria-label={`Regenerate ${prompt || 'UI'}`}
					className="mt-3 flex items-center justify-center w-9 h-9 text-xs font-medium text-gray-900 bg-white border-2 border-gray-200 rounded-lg toggle-full-view hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-900 focus:outline-none dark:text-gray-400 dark:border-gray-700 dark:hover:text-white dark:hover:bg-gray-800"
					onClick={() => refetch()}
				>
					<IconRefresh />
				</button>
				{prompt && <Chip className="mt-3 capitalize">{prompt}</Chip>}
				{src && <Chip className="mt-3 max-w-sm">{src}</Chip>}
			</div>
		</div>
	)
}
