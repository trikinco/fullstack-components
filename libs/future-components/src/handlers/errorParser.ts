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
} from '../nextjs-handlers'
import { ErrorClient } from '../errorClient'

export type ErrorParserOptions = {
	appContext?: 'http web app' | 'mobile app' | 'desktop app'
}
export class ErrorRequestBody {
	errorString!: string
}
export type ErrorParseResponse = {
	message: string
	title: string
}
export class ErrorParserError extends Error {
	public rootCause: string

	constructor(error: any) {
		super('Error parsing your error text and context with ML')
		this.name = 'ErrorParserError'
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.rootCause = error.message
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.stack = error.stack
	}
}
/**
 * The handler for the `/api/future-components/error-parser` API route.
 */
export type ErrorParserHandler = Handler<ErrorParserOptions>
export type HandleErrorParser = FutureCompHandler<ErrorParserOptions>
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
	ctx: AppRouteHandlerFnContext,
	options?: ErrorParserOptions
) => Promise<Response> | Response =
	(client) =>
	async (req, _ctx, options = {}) => {
		try {
			const res = new NextResponse()
			console.log('Error Parser APP RouteHandlerFactory')
			if (req.method !== 'POST') {
				throw new ErrorParserError(
					new Error('Only POST requests are supported')
				)
			}
			res.headers.set('Cache-Control', 'no-store')
			const requestBody = (await req.json()) as ErrorRequestBody
			console.log('requestBody', requestBody)
			const parsedError = await client.handleErrorRequest(
				requestBody.errorString,
				options.appContext
			)
			console.log('Returning next response parsedError', parsedError)
			// this is weird but we ask chatgpt for json so we parse it
			// and then pass the object, which next expects
			// same below
			return NextResponse.json(JSON.parse(parsedError.responseText), res)
		} catch (error) {
			throw new ErrorParserError(error)
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
		options = {}
	): Promise<void> => {
		try {
			assertReqRes(req, res)
			console.log('Error Parser PAGES RouteHandlerFactory')
			res.setHeader('Cache-Control', 'no-store')
			const requestBody = req.body as ErrorRequestBody
			const parsedError = await client.handleErrorRequest(
				requestBody.errorString,
				options.appContext
			)
			res.json(JSON.parse(parsedError.responseText))
		} catch (error) {
			throw new ErrorParserError(error)
		}
	}
