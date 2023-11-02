/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { NextApiResponse, NextApiRequest } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import {
	// eslint-disable-next-line unicorn/prevent-abbreviations
	AppRouteHandlerContext,
	FutureCompHandler,
	Handler,
	assertReqRes,
	getHandler,
} from '../../nextjs-handlers'
import { NotFoundEnhancerSitemapSelector } from './notFoundEnhancerSitemapSelector'
import { NotFoundEnhancerContentGenerator } from './notFoundEnhancerContentGenerator'
import { ChatGptCompletionResponse } from '../../chatGptService'
import {
	NotFoundEnhancerError,
	NotFoundEnhancerOptions,
	NotFoundEnhancerRequestBody,
	NotFoundEnhancerResponse,
} from './models'

/**
 * The handler for the `/api/future-components/notFoundEnhancer` API route.
 */
export type NotFoundEnhancerHandler = Handler<NotFoundEnhancerOptions>
export type HandleNotFoundEnhancement =
	FutureCompHandler<NotFoundEnhancerOptions>
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

	// eslint-disable-next-line sonarjs/prefer-immediate-return
	const foundHandler = getHandler<NotFoundEnhancerOptions>(
		appRouteHandler,
		pageRouteHandler
	) as HandleNotFoundEnhancement
	console.log('foundHandler', foundHandler)
	return foundHandler
}

/**
 * @ignore
 */
const appRouteHandlerFactory: (
	sitemapSelector: NotFoundEnhancerSitemapSelector,
	contentGenerator: NotFoundEnhancerContentGenerator
) => (
	req: NextRequest,
	ctx: AppRouteHandlerContext,
	options?: NotFoundEnhancerOptions
) => Promise<Response> | Response =
	(sitemapSelector, contentGenerator) => async (req, _ctx, options) => {
		console.log('Running handler')
		try {
			const res = new NextResponse()
			console.log('Not found enhancer APP RouteHandlerFactory')
			if (req.method !== 'POST') {
				throw new NotFoundEnhancerError(
					new Error('Only POST requests are supported')
				)
			}
			if (!options) {
				throw new NotFoundEnhancerError(new Error('No options provided'))
			}
			res.headers.set('Cache-Control', 'no-store')
			const requestBody = (await req.json()) as NotFoundEnhancerRequestBody
			console.log('requestBody', requestBody)
			const [bestAlternateUrls, generatedContent] = await Promise.allSettled([
				sitemapSelector.handle(requestBody, options),
				contentGenerator.handle(requestBody, options),
			])
			const response = mapPromiseResults(bestAlternateUrls, generatedContent)

			return NextResponse.json(response, res)
		} catch (error) {
			console.error(error, 'handler error')
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
	options?: NotFoundEnhancerOptions
) => Promise<void> =
	(sitemapSelector, contentGenerator) =>
	async (
		req: NextApiRequest,
		res: NextApiResponse,
		options?: NotFoundEnhancerOptions
	): Promise<void> => {
		try {
			assertReqRes(req, res)
			console.log('Not Found PAGES RouteHandlerFactory')
			if (req.method !== 'POST') {
				throw new NotFoundEnhancerError(
					new Error('Only POST requests are supported')
				)
			}
			if (!options) {
				throw new NotFoundEnhancerError(new Error('No options provided'))
			}
			res.setHeader('Cache-Control', 'no-store')
			const requestBody = req.body as NotFoundEnhancerRequestBody
			const [bestAlternateUrls, generatedContent] = await Promise.allSettled([
				sitemapSelector.handle(requestBody, options),
				contentGenerator.handle(requestBody, options),
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
