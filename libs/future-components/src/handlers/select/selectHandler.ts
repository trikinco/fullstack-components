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
import { SelectClient } from './selectClient'
import {
	type SelectRequestBody,
	type SelectOptions,
	SelectError,
} from './models'

/**
 * The handler for the `/api/future-components/select` API route.
 */
export type SelectHandler = Handler<SelectOptions>
export type HandleSelect = FutureCompHandler<SelectOptions>

/**
 * @ignore
 */
export default function selectHandler(client: SelectClient): HandleSelect {
	const appRouteHandler = appRouteHandlerFactory(client)
	const pageRouteHandler = pageRouteHandlerFactory(client)

	return getHandler<object>(appRouteHandler, pageRouteHandler) as HandleSelect
}

/**
 * @ignore
 */
const appRouteHandlerFactory: (
	client: SelectClient
) => (
	req: NextRequest,
	ctx: AppRouteHandlerContext,
	options?: SelectOptions
) => Promise<Response> | Response =
	(client) =>
	async (req, _ctx, options = {}) => {
		try {
			const res = new NextResponse()
			console.log('Select APP RouteHandlerFactory')
			if (req.method !== 'POST') {
				throw new SelectError(new Error('Only POST requests are supported'))
			}
			res.headers.set('Cache-Control', 'no-store')
			const requestBody = (await req.json()) as SelectRequestBody
			console.log('requestBody', requestBody)
			const gptResponse = await client.handle(requestBody, options)

			return NextResponse.json(JSON.parse(gptResponse.responseText), res)
		} catch (error) {
			throw new SelectError(error)
		}
	}

/**
 * @ignore
 */
const pageRouteHandlerFactory: (
	client: SelectClient
) => (
	req: NextApiRequest,
	res: NextApiResponse,
	options?: SelectOptions
) => Promise<void> =
	(client) =>
	async (
		req: NextApiRequest,
		res: NextApiResponse,
		options = {}
	): Promise<void> => {
		try {
			assertReqRes(req, res)
			console.log('Select PAGES RouteHandlerFactory')
			res.setHeader('Cache-Control', 'no-store')
			const requestBody = req.body as SelectRequestBody
			const parsedError = await client.handle(requestBody, options)
			res.json(JSON.parse(parsedError.responseText))
		} catch (error) {
			throw new SelectError(error)
		}
	}
