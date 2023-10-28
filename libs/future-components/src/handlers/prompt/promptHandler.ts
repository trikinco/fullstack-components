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
import { PromptClient } from './promptClient'

export class PromptRequestBody {
	prompt?: string
}

export type PromptResponse = {
	data: string
}

export class PromptError extends Error {
	public rootCause: string

	constructor(error: any) {
		super('Error running prompt')
		this.name = 'PromptError'
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.rootCause = error.message
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.stack = error.stack
	}
}
/**
 * The handler for the `/api/future-components/prompt` API route.
 */
export type PromptHandler = Handler<never>
export type HandlePrompt = FutureCompHandler<never>
/**
 * @ignore
 */
export default function promptHandler(client: PromptClient): HandlePrompt {
	const appRouteHandler = appRouteHandlerFactory(client)
	const pageRouteHandler = pageRouteHandlerFactory(client)

	return getHandler<object>(appRouteHandler, pageRouteHandler) as HandlePrompt
}

/**
 * @ignore
 */
const appRouteHandlerFactory: (
	client: PromptClient
) => (
	req: NextRequest,
	ctx: AppRouteHandlerFnContext,
	options?: object
) => Promise<Response> | Response =
	(client) =>
	async (req, _ctx, options = {}) => {
		try {
			const res = new NextResponse()
			console.log('Prompt APP RouteHandlerFactory')
			if (req.method !== 'POST') {
				throw new PromptError(new Error('Only POST requests are supported'))
			}
			res.headers.set('Cache-Control', 'no-store')
			const requestBody = (await req.json()) as PromptRequestBody
			console.log('requestBody', requestBody)
			const gptResponse = await client.handle(requestBody)

			return NextResponse.json(gptResponse.responseText, res)
		} catch (error) {
			throw new PromptError(error)
		}
	}

/**
 * @ignore
 */
const pageRouteHandlerFactory: (
	client: PromptClient
) => (
	req: NextApiRequest,
	res: NextApiResponse,
	options?: object
) => Promise<void> =
	(client) =>
	async (
		req: NextApiRequest,
		res: NextApiResponse,
		options = {}
	): Promise<void> => {
		try {
			assertReqRes(req, res)
			console.log('Prompt PAGES RouteHandlerFactory')
			res.setHeader('Cache-Control', 'no-store')
			const requestBody = req.body as PromptRequestBody
			const parsedError = await client.handle(requestBody)
			res.json(JSON.parse(parsedError.responseText))
		} catch (error) {
			throw new PromptError(error)
		}
	}
