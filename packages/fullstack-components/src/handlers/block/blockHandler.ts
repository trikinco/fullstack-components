/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import type { NextApiResponse, NextApiRequest } from 'next'
import { type NextRequest, NextResponse } from 'next/server'
import {
	// eslint-disable-next-line unicorn/prevent-abbreviations
	type AppRouteHandlerContext,
	type FullstackComponentsHandler,
	type Handler,
	assertReqRes,
	getHandler,
} from '../../nextjs-handlers'
import type { BlockClient } from './blockClient'
import { type BlockRequestBody, type BlockOptions, BlockError } from './models'

/**
 * The handler for the `/api/fsutils/block` API route.
 */
export type BlockHandler = Handler<BlockOptions>
export type HandleBlock = FullstackComponentsHandler<BlockOptions>

/**
 * @ignore
 */
export default function blockHandler(client: BlockClient): HandleBlock {
	const appRouteHandler = appRouteHandlerFactory(client)
	const pageRouteHandler = pageRouteHandlerFactory(client)

	return getHandler<object>(appRouteHandler, pageRouteHandler) as HandleBlock
}

/**
 * @ignore
 */
const appRouteHandlerFactory: (
	client: BlockClient
) => (
	req: NextRequest,
	ctx: AppRouteHandlerContext,
	options?: BlockOptions
) => Promise<Response> | Response =
	(client) =>
	async (req, _ctx, options = {}) => {
		try {
			const res = new NextResponse()
			console.log('Block APP RouteHandlerFactory')
			if (req.method !== 'POST') {
				throw new BlockError(new Error('Only POST requests are supported'))
			}
			res.headers.set('Cache-Control', 'no-store')
			const requestBody = (await req.json()) as BlockRequestBody
			console.log('requestBody', requestBody)
			const gptResponse = await client.handle(requestBody, options)

			return NextResponse.json(gptResponse.responseText, res)
		} catch (error) {
			throw new BlockError(error)
		}
	}

/**
 * @ignore
 */
const pageRouteHandlerFactory: (
	client: BlockClient
) => (
	req: NextApiRequest,
	res: NextApiResponse,
	options?: BlockOptions
) => Promise<void> =
	(client) =>
	async (
		req: NextApiRequest,
		res: NextApiResponse,
		options = {}
	): Promise<void> => {
		try {
			assertReqRes(req, res)
			console.log('Block PAGES RouteHandlerFactory')
			res.setHeader('Cache-Control', 'no-store')
			const requestBody = req.body as BlockRequestBody
			const parsedError = await client.handle(requestBody, options)
			res.json(JSON.parse(parsedError.responseText))
		} catch (error) {
			throw new BlockError(error)
		}
	}
