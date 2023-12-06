/* eslint-disable @typescript-eslint/naming-convention */
import { NextApiResponse, NextApiRequest } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import {
	// eslint-disable-next-line unicorn/prevent-abbreviations
	AppRouteHandlerContext,
	FullstackComponentsHandler,
	Handler,
	assertReqRes,
	getHandler,
} from '../../nextjs-handlers'
import { ErrorClient } from './errorClient'
import {
	ErrorParserOptions,
	ErrorEnhancementError,
	ErrorEnhancementRequestBody,
} from './models'

/**
 * The handler for the `/api/fsutils/error-parser` API route.
 */
export type ErrorParserHandler = Handler<ErrorParserOptions>
export type HandleErrorParser = FullstackComponentsHandler<ErrorParserOptions>
/**
 * @ignore
 */
export default function errorParserHandler(
	client: ErrorClient
): HandleErrorParser {
	const appRouteHandler = appRouteHandlerFactory(client)
	const pageRouteHandler = pageRouteHandlerFactory(client)

	return getHandler<ErrorParserOptions>(
		appRouteHandler,
		pageRouteHandler
	) as HandleErrorParser
}

/**
 * @ignore
 */
const appRouteHandlerFactory: (
	client: ErrorClient
) => (
	req: NextRequest,
	ctx: AppRouteHandlerContext,
	options?: ErrorParserOptions
) => Promise<Response> | Response = (client) => async (req, _ctx, options) => {
	try {
		const res = new NextResponse()
		console.log('Error Parser APP RouteHandlerFactory')
		if (req.method !== 'POST') {
			throw new ErrorEnhancementError(
				new Error('Only POST requests are supported')
			)
		}
		res.headers.set('Cache-Control', 'no-store')
		const requestBody = (await req.json()) as ErrorEnhancementRequestBody
		console.log('requestBody', requestBody)
		const parsedError = await client.handle(requestBody, options)
		console.log('Returning next response parsedError', parsedError)
		// this is weird but we ask chatgpt for json so we parse it
		// and then pass the object, which next expects
		// same below
		return NextResponse.json(JSON.parse(parsedError.responseText), res)
	} catch (error) {
		throw new ErrorEnhancementError(error)
	}
}

/**
 * @ignore
 */
const pageRouteHandlerFactory: (
	client: ErrorClient
) => (
	req: NextApiRequest,
	res: NextApiResponse,
	options?: ErrorParserOptions
) => Promise<void> =
	(client) =>
	async (
		req: NextApiRequest,
		res: NextApiResponse,
		options?: ErrorParserOptions
	): Promise<void> => {
		try {
			assertReqRes(req, res)
			console.log('Error Parser PAGES RouteHandlerFactory')
			res.setHeader('Cache-Control', 'no-store')
			const requestBody = req.body as ErrorEnhancementRequestBody
			const parsedError = await client.handle(requestBody, options)
			res.json(JSON.parse(parsedError.responseText))
		} catch (error) {
			throw new ErrorEnhancementError(error)
		}
	}
