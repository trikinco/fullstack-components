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
		<div className="mt-6">
			<p>{data?.generatedContent}</p>
			{hasUrlSuggestions && (
				<>
					<p className="font-bold">Try one of these pages instead:</p>
					{data?.bestAlternateUrls.map((url, i) => (
						<Link href={url} key={i} className="block">
							{url}
						</Link>
					))}
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
