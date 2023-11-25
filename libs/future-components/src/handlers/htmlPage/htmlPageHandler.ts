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
import { HtmlPageClient } from './htmlPageClient'
import {
	type HtmlPageRequestBody,
	type HtmlPageOptions,
	HtmlPageError,
} from './models'
import { getHtmlFromChatResponseText } from './htmlPageParser'

/**
 * The handler for the `/api/future-components/htmlPage` API route.
 */
export type HtmlPageHandler = Handler<HtmlPageOptions>
export type HandleHtmlPage = FutureCompHandler<HtmlPageOptions>

/**
 * @ignore
 */
export default function htmlPageHandler(
	client: HtmlPageClient
): HandleHtmlPage {
	const appRouteHandler = appRouteHandlerFactory(client)
	const pageRouteHandler = pageRouteHandlerFactory(client)

	return getHandler<object>(appRouteHandler, pageRouteHandler) as HandleHtmlPage
}

/**
 * @ignore
 */
const appRouteHandlerFactory: (
	client: HtmlPageClient
) => (
	req: NextRequest,
	ctx: AppRouteHandlerContext,
	options?: HtmlPageOptions
) => Promise<Response> | Response =
	(client) =>
	async (req, _ctx, options = {}) => {
		try {
			const res = new NextResponse()
			console.log('HTML Page APP RouteHandlerFactory')

			if (req.method !== 'POST') {
				throw new HtmlPageError(new Error('Only POST requests are supported'))
			}

			res.headers.set('Cache-Control', 'no-store')
			res.headers.set('Content-Type', 'text/html')

			const requestBody = (await req.json()) as HtmlPageRequestBody

			console.log('requestBody', requestBody)

			const gptResponse = await client.handle(requestBody, options)
			const htmlText = getHtmlFromChatResponseText(gptResponse.responseText)

			return NextResponse.json(htmlText, res)
		} catch (error) {
			throw new HtmlPageError(error)
		}
	}

/**
 * @ignore
 */
const pageRouteHandlerFactory: (
	client: HtmlPageClient
) => (
	req: NextApiRequest,
	res: NextApiResponse,
	options?: HtmlPageOptions
) => Promise<void> =
	(client) =>
	async (
		req: NextApiRequest,
		res: NextApiResponse,
		options = {}
	): Promise<void> => {
		try {
			assertReqRes(req, res)
			console.log('HTML Page PAGES RouteHandlerFactory')

			res.setHeader('Cache-Control', 'no-store')
			res.setHeader('Content-Type', 'text/html')

			const requestBody = req.body as HtmlPageRequestBody
			const gptResponse = await client.handle(requestBody, options)
			const htmlText = getHtmlFromChatResponseText(gptResponse.responseText)

			res.json(htmlText)
		} catch (error) {
			throw new HtmlPageError(error)
		}
	}
