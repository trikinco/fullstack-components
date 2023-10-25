import { NextApiResponse, NextApiRequest } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import {
	AppRouteHandlerFnContext,
	FutureCompHandler,
	Handler,
	assertReqRes,
	getHandler,
} from '../../nextjs-handlers'
import { NotFoundEnhancerClient } from './notFoundEnhancerClient'

export class NotFoundEnhancerRequestBody {

	requestedUrl?: string
}
export type NotFoundEnhancerResponse = {
	generatedContent: string
	bestAlternateUrl: string
}
export class NotFoundEnhancerError extends Error {
	public rootCause: string

	constructor(error: any) {
		super('Error running 404 enhancer')
		this.name = 'NotFoundEnhancerError'
		this.rootCause = error.message
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
	client: NotFoundEnhancerClient
): HandleNotFoundEnhancement {
	const appRouteHandler = appRouteHandlerFactory(client)
	const pageRouteHandler = pageRouteHandlerFactory(client)

	return getHandler<{}>(
		appRouteHandler,
		pageRouteHandler
	) as HandleNotFoundEnhancement
}

/**
 * @ignore
 */
const appRouteHandlerFactory: (
	client: NotFoundEnhancerClient
) => (
	req: NextRequest,
	ctx: AppRouteHandlerFnContext,
	options?: {}
) => Promise<Response> | Response =
	(client) =>
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
			let requestBody = (await req.json()) as NotFoundEnhancerRequestBody
			console.log('requestBody', requestBody)
			const gptResponse = await client.handle(requestBody)

			// this is weird but we ask chatgpt for json so we parse it
			// and then pass the object, which next expects
			// same below
			return NextResponse.json(JSON.parse(gptResponse.responseText), res)
		} catch (e) {
			throw new NotFoundEnhancerError(e)
		}
	}

/**
 * @ignore
 */
const pageRouteHandlerFactory: (
	client: NotFoundEnhancerClient
) => (
	req: NextApiRequest,
	res: NextApiResponse,
	options?: {}
) => Promise<void> =
	(client) =>
	async (
		req: NextApiRequest,
		res: NextApiResponse,
		options = {}
	): Promise<void> => {
		try {
			assertReqRes(req, res)
			console.log('Not Found PAGES RouteHandlerFactory')
			res.setHeader('Cache-Control', 'no-store')
			let requestBody = req.body as NotFoundEnhancerRequestBody
			const parsedError = await client.handle(requestBody)
			res.json(JSON.parse(parsedError.responseText))
		} catch (e) {
			throw new NotFoundEnhancerError(e)
		}
	}
