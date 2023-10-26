'use client'

import { useNotFoundEnhancement } from '@fullstack-components/ai-components/client'
import Link from 'next/link'

export function NotFoundEnhancer() {
	// load all possible pages (for this segment?)
	const { data, isLoading } = useNotFoundEnhancement()

	if (!data || isLoading) {
		return <p>Checking for alternate solution...</p>
	}
	return (
		<div>
			<p>{data?.generatedContent}</p>
			<p>Try this url instead:</p>
			<div>
				<Link href={data?.bestAlternateUrl || '#'}>
					{data?.bestAlternateUrl || 'No alternate url found'}
				</Link>
			</div>
		</div>
	)
}
