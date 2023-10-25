"use client"

import Link from 'next/link'

import {

	NotFoundEnhancerRequestBody,
	NotFoundEnhancerResponse,
} from '@darraghor/ai-components'
import { use, useEffect, useState } from 'react'


export  function NotFoundEnhancer() {
	// load all possible pages (for this segment?)
const [content, setContent] = useState<NotFoundEnhancerResponse | null>(null)
useEffect(() => {
	const fetchData = async () => {
        const response = await fetch('/api/fsutils/not-found-enhancer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                requestedUrl: window && window.location.href,
            } as NotFoundEnhancerRequestBody),
        })
        const parsedResponse = await response.json() as NotFoundEnhancerResponse

        setContent(parsedResponse)
	}

fetchData()}, [])
if (!content) {
        return <p>Checking for alternate solution...</p>
}
	return (
		<div>
			<p>{content?.generatedContent}</p>
			<p>You can try this url instead</p>
			<div>
				<Link href={content?.bestAlternateUrl || '#'}>
					{content?.bestAlternateUrl || 'No url'}
				</Link>
			</div>
		</div>
	)
}
