/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { PromptClient } from './promptClient'
import {
	type PromptRequestBody,
	type PromptOptions,
	PromptError,
} from './models'

/**
 * The handler for the `/api/fsutils/prompt` API route.
 */
export type PromptHandler = Handler<PromptOptions>
export type HandlePrompt = FullstackComponentsHandler<PromptOptions>

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
	ctx: AppRouteHandlerContext,
	options?: PromptOptions
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
			const gptResponse = await client.handle(requestBody, options)

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
	options?: PromptOptions
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
			const parsedError = await client.handle(requestBody, options)
			res.json(JSON.parse(parsedError.responseText))
		} catch (error) {
			throw new PromptError(error)
		}
	}
