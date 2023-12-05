import { Chip } from '@/src/components/Chip'
import { IconRefresh } from '@/src/components/Icons/IconRefresh'
import { Spinner } from '@/src/components/Spinner'
import { PreviewCode } from '../components/PreviewCode'

export interface HTMLPageProps {
	refetch: () => void
	prompt?: string
	src?: string
	/** The generated HTML content to preview in the iframe */
	data?: string | null
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
			<PreviewCode
				title={prompt || src || 'AI-Generated HTML'}
				code={data}
				fallback={
					<div className="h-full grid place-items-center text-slate-900">
						Something went wrong while creating &quot;{prompt || src}
						&quot;
					</div>
				}
			>
				{!isLoading && !isError && !data && (
					<label
						htmlFor="prompt"
						className="absolute place-self-center text-slate-900"
					>
						Tell me what you&apos;d like to create 🪄
					</label>
				)}
				{isLoading && !isError && (
					<div className="absolute place-self-center text-slate-900">
						<Spinner classNameSpinner="mx-auto">
							Creating &quot;{prompt || src}&quot;
						</Spinner>
					</div>
				)}
				{!isLoading && isError && (
					<div className="absolute place-self-center text-slate-900">
						Error creating &quot;{prompt || src}&quot;
					</div>
				)}
			</PreviewCode>

			<div className="flex gap-3">
				{(!!data || isError) && (
					<button
						disabled={isLoading}
						aria-label={`Regenerate ${prompt || 'UI'}`}
						className="mt-3 flex items-center justify-center w-9 h-9 text-xs font-medium text-gray-900 bg-white border-2 border-gray-200 rounded-lg toggle-full-view hover:bg-gray-100 hover:text-blue-700 focus:z-10 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-700 dark:hover:text-white dark:hover:bg-gray-800 focus-ring"
						onClick={() => refetch()}
					>
						<IconRefresh width={20} height={20} />
					</button>
				)}
				{prompt && <Chip className="mt-3 capitalize">{prompt}</Chip>}
				{src && <Chip className="mt-3 max-w-sm">{src}</Chip>}
			</div>
		</div>
	)
}
