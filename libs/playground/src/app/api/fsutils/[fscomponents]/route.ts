import {
	handleFSComponents,
	handleNotFoundEnhancement,
} from '@fullstack-components/ai-components'
import { NextApiRequest, NextApiResponse } from 'next'

export const GET = handleFSComponents({
	// was this a really bad name for this? i think so :D
	// maybe change before public release notFoundEnhancer
	['not-found-enhancer']: handleNotFoundEnhancement({
		siteUrl: process.env.SITE_URL || '',
		openAiApiKey: process.env.OPENAI_API_KEY || '',
	}),
})

export const POST = handleFSComponents({
	// was this a really bad name for this? i think so :D
	// maybe change before public release notFoundEnhancer
	['not-found-enhancer']: handleNotFoundEnhancement({
		siteUrl: process.env.SITE_URL || '',
		openAiApiKey: process.env.OPENAI_API_KEY || '',
	}),
})
