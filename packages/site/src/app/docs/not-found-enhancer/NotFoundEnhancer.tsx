'use client'

import { useNotFoundEnhancement } from '@trikinco/fullstack-components/client'
import Link from 'next/link'
import { Spinner } from '@/src/components/Spinner'

export function NotFoundEnhancer() {
	const { data, isLoading } = useNotFoundEnhancement()
	const hasUrlSuggestions =
		data?.bestAlternateUrls && data.bestAlternateUrls.length > 0

	if (!data || isLoading) {
		return <Spinner>Please wait, checking for other solutions...</Spinner>
	}

	return (
		<div>
			{/* A helpful message derived from inspecting the `requestedUrl` and sitemap. */}
			<p>{data?.generatedContent}</p>

			{hasUrlSuggestions && (
				<>
					<p className="font-bold mt-3" id="url-suggestions">
						Try one of these pages instead:
					</p>
					<ul aria-labelledby="url-suggestions">
						{/* A list of the most likely suitable URLs for the visitor to navigate to. */}
						{data?.bestAlternateUrls.map((url, i) => (
							<li key={i}>
								<Link href={url} className="block underline">
									{url}
								</Link>
							</li>
						))}
					</ul>
				</>
			)}

			{!hasUrlSuggestions && (
				<p>
					Sorry we couldn&apos;t find additional pages for you to try this time.
				</p>
			)}
		</div>
	)
}
