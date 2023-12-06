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
import { TextClient } from './textClient'
import { type TextRequestBody, type TextOptions, TextError } from './models'

/**
 * The handler for the `/api/fsutils/text` API route.
 */
export type TextHandler = Handler<TextOptions>
export type HandleText = FullstackComponentsHandler<TextOptions>

/**
 * @ignore
 */
export default function textHandler(client: TextClient): HandleText {
	const appRouteHandler = appRouteHandlerFactory(client)
	const pageRouteHandler = pageRouteHandlerFactory(client)

	return getHandler<object>(appRouteHandler, pageRouteHandler) as HandleText
}

/**
 * @ignore
 */
const appRouteHandlerFactory: (
	client: TextClient
) => (
	req: NextRequest,
	ctx: AppRouteHandlerContext,
	options?: TextOptions
) => Promise<Response> | Response =
	(client) =>
	async (req, _ctx, options = {}) => {
		try {
			const res = new NextResponse()
			console.log('Text APP RouteHandlerFactory')
			if (req.method !== 'POST') {
				throw new TextError(new Error('Only POST requests are supported'))
			}
			res.headers.set('Cache-Control', 'no-store')
			const requestBody = (await req.json()) as TextRequestBody
			console.log('requestBody', requestBody)
			const gptResponse = await client.handle(requestBody, options)

			return NextResponse.json(JSON.parse(gptResponse.responseText), res)
		} catch (error) {
			throw new TextError(error)
		}
	}

/**
 * @ignore
 */
const pageRouteHandlerFactory: (
	client: TextClient
) => (
	req: NextApiRequest,
	res: NextApiResponse,
	options?: TextOptions
) => Promise<void> =
	(client) =>
	async (
		req: NextApiRequest,
		res: NextApiResponse,
		options = {}
	): Promise<void> => {
		try {
			assertReqRes(req, res)
			console.log('Text PAGES RouteHandlerFactory')
			res.setHeader('Cache-Control', 'no-store')
			const requestBody = req.body as TextRequestBody
			const parsedError = await client.handle(requestBody, options)
			res.json(JSON.parse(parsedError.responseText))
		} catch (error) {
			throw new TextError(error)
		}
	}
