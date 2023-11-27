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
import { ImageClient } from './imageClient'
import { type ImageRequestBody, type ImageOptions, ImageError } from './models'

/**
 * The handler for the `/api/future-components/image` API route.
 */
export type ImageHandler = Handler<ImageOptions>
export type HandleImage = FutureCompHandler<ImageOptions>

/**
 * @ignore
 */
export default function imageHandler(client: ImageClient): HandleImage {
	const appRouteHandler = appRouteHandlerFactory(client)
	const pageRouteHandler = pageRouteHandlerFactory(client)

	return getHandler<object>(appRouteHandler, pageRouteHandler) as HandleImage
}

/**
 * @ignore
 */
const appRouteHandlerFactory: (
	client: ImageClient
) => (
	req: NextRequest,
	ctx: AppRouteHandlerContext,
	options?: ImageOptions
) => Promise<Response> | Response =
	(client) =>
	async (req, _ctx, options = {}) => {
		try {
			const res = new NextResponse()
			console.log('Image APP RouteHandlerFactory')
			if (req.method !== 'POST') {
				throw new ImageError(new Error('Only POST requests are supported'))
			}
			res.headers.set('Cache-Control', 'no-store')
			const requestBody = (await req.json()) as ImageRequestBody
			console.log('requestBody', requestBody)
			const gptResponse = await client.handle(requestBody, options)

			return NextResponse.json(gptResponse.responseText, res)
		} catch (error) {
			throw new ImageError(error)
		}
	}

/**
 * @ignore
 */
const pageRouteHandlerFactory: (
	client: ImageClient
) => (
	req: NextApiRequest,
	res: NextApiResponse,
	options?: ImageOptions
) => Promise<void> =
	(client) =>
	async (
		req: NextApiRequest,
		res: NextApiResponse,
		options = {}
	): Promise<void> => {
		try {
			assertReqRes(req, res)
			console.log('Image PAGES RouteHandlerFactory')
			res.setHeader('Cache-Control', 'no-store')
			const requestBody = req.body as ImageRequestBody
			const parsedError = await client.handle(requestBody, options)
			res.json(parsedError.responseText)
		} catch (error) {
			throw new ImageError(error)
		}
	}
