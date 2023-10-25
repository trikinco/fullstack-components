'use client'

import { useNotFoundEnhancement } from '@fullstack-components/ai-components'
import Link from 'next/link'

export function NotFoundEnhancer() {
	// load all possible pages (for this segment?)
	const { content, isLoading } = useNotFoundEnhancement()
	if (!content || isLoading) {
		return <p>Checking for alternate solution...</p>
	}
	return (
		<div>
			<p>{content?.generatedContent}</p>
			<p>Try this url instead:</p>
			<div>
				<Link href={content?.bestAlternateUrl || '#'}>
					{content?.bestAlternateUrl || 'No alternate url found'}
				</Link>
			</div>
		</div>
	)
}
