import { NextApiResponse, NextApiRequest } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import {
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
export type ErrorRequestBody = { errorString: string }
export class ErrorParserError extends Error {
	public rootCause: string

	constructor(error: any) {
		super('Error parsing your error text and context with ML')
		this.name = 'ErrorParserError'
		this.rootCause = error.message
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

			res.headers.set('Cache-Control', 'no-store')
			let requestBody = (await req.json()) as ErrorRequestBody
			const parsedError = client.handleErrorRequest(
				requestBody.errorString,
				options.appContext
			)

			return NextResponse.json(parsedError, res)
		} catch (e) {
			throw new ErrorParserError(e)
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
			res.setHeader('Cache-Control', 'no-store')
			let requestBody = req.body as ErrorRequestBody
			const parsedError = client.handleErrorRequest(
				requestBody.errorString,
				options.appContext
			)
			res.json(parsedError)
		} catch (e) {
			throw new ErrorParserError(e)
		}
	}