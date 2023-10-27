'use client'

import { useNotFoundEnhancement } from '@fullstack-components/ai-components/client'
import Link from 'next/link'

export function NotFoundEnhancer() {
	// load all possible pages (for this segment?)
	const { data, isLoading } = useNotFoundEnhancement()

	if (!data || isLoading) {
		return <p>Checking for alternate solutions...</p>
	}
	const hasUrls = data?.bestAlternateUrls && data.bestAlternateUrls.length > 0
	return (
		<div className="mt-6">
			<p>{data?.generatedContent}</p>
			{hasUrls && (
				<>
					<p>Try one of these pages instead:</p>
					{data?.bestAlternateUrls.map((url, i) => (
						<div key={i}>
							<Link href={url}>{url}</Link>
						</div>
					))}
				</>
			)}
			{!hasUrls && (
				<p>
					Sorry we couldn&amp;t find additional pages for you to try this time.
				</p>
			)}
		</div>
	)
}
