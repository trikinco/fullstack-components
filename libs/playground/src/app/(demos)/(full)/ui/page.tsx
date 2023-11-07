'use client'

import { Chip } from '@/src/components/Chip'
import { IconRefresh } from '@/src/components/Icons/IconRefresh'
import { PageHeader } from '@/src/components/PageHeader'
import { Spinner } from '@/src/components/Spinner'
import { useUi } from '@/src/hooks/useUi'

const prompt = 'an FAQ accordion'

export default function Page() {
	const { fetchUi, content, isLoading, isError } = useUi(prompt)

	return (
		<>
			<PageHeader
				className="max-w-prose mx-auto text-center"
				title="Generative UI"
			/>

			<div className="w-full h-full aspect-square md:aspect-video overflow-hidden bg-white rounded-lg">
				{!isLoading && content && (
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
				)}

				{isLoading && !isError ? (
					<div className="h-full grid place-items-center text-slate-900">
						<Spinner classNameSpinner="mx-auto">
							Handling UI prompt for &quot;{prompt}&quot;
						</Spinner>
					</div>
				) : (
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
					onClick={() => fetchUi(prompt)}
				>
					<IconRefresh />
				</button>
				<Chip className="mt-3 capitalize">{prompt}</Chip>
			</div>
		</>
	)
}
