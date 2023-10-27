/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { NextApiResponse, NextApiRequest } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import {
	// eslint-disable-next-line unicorn/prevent-abbreviations
	AppRouteHandlerFnContext,
	FutureCompHandler,
	Handler,
	assertReqRes,
	getHandler,
} from '../../nextjs-handlers'
import { NotFoundEnhancerSitemapSelector } from './notFoundEnhancerSitemapSelector'
import { NotFoundEnhancerContentGenerator } from './notFoundEnhancerContentGenerator'
import { ChatGptCompletionResponse } from '../../chatGptService'

export class NotFoundEnhancerRequestBody {
	requestedUrl?: string
}
export type NotFoundEnhancerResponse = {
	generatedContent: string
	bestAlternateUrls: string[]
}
export class NotFoundEnhancerError extends Error {
	public rootCause: string

	constructor(error: any) {
		super('Error running 404 enhancer')
		this.name = 'NotFoundEnhancerError'
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.rootCause = error.message
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.stack = error.stack
	}
}
/**
 * The handler for the `/api/future-components/not-found-enhancer` API route.
 */
export type NotFoundEnhancerHandler = Handler<never>
export type HandleNotFoundEnhancement = FutureCompHandler<never>
/**
 * @ignore
 */
export default function notFoundEnhancementHandler(
	sitemapSelector: NotFoundEnhancerSitemapSelector,
	contentGenerator: NotFoundEnhancerContentGenerator
): HandleNotFoundEnhancement {
	const appRouteHandler = appRouteHandlerFactory(
		sitemapSelector,
		contentGenerator
	)
	const pageRouteHandler = pageRouteHandlerFactory(
		sitemapSelector,
		contentGenerator
	)

	return getHandler<object>(
		appRouteHandler,
		pageRouteHandler
	) as HandleNotFoundEnhancement
}

/**
 * @ignore
 */
const appRouteHandlerFactory: (
	sitemapSelector: NotFoundEnhancerSitemapSelector,
	contentGenerator: NotFoundEnhancerContentGenerator
) => (
	req: NextRequest,
	ctx: AppRouteHandlerFnContext,
	options?: object
) => Promise<Response> | Response =
	(sitemapSelector, contentGenerator) =>
	async (req, _ctx, options = {}) => {
		try {
			const res = new NextResponse()
			console.log('Not found enhancer APP RouteHandlerFactory')
			if (req.method !== 'POST') {
				throw new NotFoundEnhancerError(
					new Error('Only POST requests are supported')
				)
			}
			res.headers.set('Cache-Control', 'no-store')
			const requestBody = (await req.json()) as NotFoundEnhancerRequestBody
			console.log('requestBody', requestBody)
			const [bestAlternateUrls, generatedContent] = await Promise.allSettled([
				sitemapSelector.handle(requestBody),
				contentGenerator.handle(requestBody),
			])
			const response = mapPromiseResults(bestAlternateUrls, generatedContent)

			return NextResponse.json(response, res)
		} catch (error) {
			throw new NotFoundEnhancerError(error)
		}
	}

/**
 * @ignore
 */
const pageRouteHandlerFactory: (
	sitemapSelector: NotFoundEnhancerSitemapSelector,
	contentGenerator: NotFoundEnhancerContentGenerator
) => (
	req: NextApiRequest,
	res: NextApiResponse,
	options?: object
) => Promise<void> =
	(sitemapSelector, contentGenerator) =>
	async (
		req: NextApiRequest,
		res: NextApiResponse,
		options = {}
	): Promise<void> => {
		try {
			assertReqRes(req, res)
			console.log('Not Found PAGES RouteHandlerFactory')
			res.setHeader('Cache-Control', 'no-store')
			const requestBody = req.body as NotFoundEnhancerRequestBody
			const [bestAlternateUrls, generatedContent] = await Promise.allSettled([
				sitemapSelector.handle(requestBody),
				contentGenerator.handle(requestBody),
			])
			const response = mapPromiseResults(bestAlternateUrls, generatedContent)

			res.json(response)
		} catch (error) {
			throw new NotFoundEnhancerError(error)
		}
	}

function mapPromiseResults(
	bestAlternateUrls: PromiseSettledResult<ChatGptCompletionResponse>,
	generatedContent: PromiseSettledResult<ChatGptCompletionResponse>
) {
	const response: NotFoundEnhancerResponse = {
		generatedContent: '',
		bestAlternateUrls: [],
	}
	try {
		if (generatedContent.status === 'fulfilled') {
			response.generatedContent =
				(
					JSON.parse(generatedContent.value.responseText) as {
						generatedContent: undefined | string
					}
				).generatedContent || ''
		}
	} catch (error) {
		// just log the error and continue
		console.error(error)
	}
	try {
		if (bestAlternateUrls.status === 'fulfilled') {
			response.bestAlternateUrls =
				(
					JSON.parse(bestAlternateUrls.value.responseText) as {
						bestAlternateUrls: string[] | undefined
					}
				).bestAlternateUrls || []
		}
	} catch (error) {
		// just log the error and continue
		console.error(error)
	}

	return response
}
