'use client'

import { useNotFoundEnhancement } from '@trikinco/fullstack-components/client'
import Link from 'next/link'
import { Spinner } from '@/src/components/Spinner'

export function NotFoundEnhancer() {
	const { data, isLoading } = useNotFoundEnhancement()
	const hasUrlSuggestions =
		data?.bestAlternateUrls && data.bestAlternateUrls.length > 0

	if (!data || isLoading) {
		return (
			<Spinner>
				Please wait, checking for other solutions...
			</Spinner>
		)
	}

	return (
		<div>
			<p>{data?.generatedContent}</p>
			{hasUrlSuggestions && (
				<>
					<p className="font-bold mt-3" id="url-suggestions">
						Try one of these pages instead:
					</p>
					<ul aria-labelledby="url-suggestions">
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
					Sorry we couldn&amp;t find additional pages for you to try this time.
				</p>
			)}
		</div>
	)
}
