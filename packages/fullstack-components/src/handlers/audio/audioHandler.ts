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
import type { AudioClient } from './audioClient'
import { type AudioRequestBody, type AudioOptions, AudioError } from './models'

/**
 * The handler for the `/api/fsutils/audio` API route.
 */
export type AudioHandler = Handler<AudioOptions>
export type HandleAudio = FullstackComponentsHandler<AudioOptions>

/**
 * @ignore
 */
export default function audioHandler(client: AudioClient): HandleAudio {
	const appRouteHandler = appRouteHandlerFactory(client)
	const pageRouteHandler = pageRouteHandlerFactory(client)

	return getHandler<object>(appRouteHandler, pageRouteHandler) as HandleAudio
}

/**
 * @ignore
 */
const appRouteHandlerFactory: (
	client: AudioClient
) => (
	req: NextRequest,
	ctx: AppRouteHandlerContext,
	options?: AudioOptions
) => Promise<Response> | Response =
	(client) =>
	async (req, _ctx, options = {}) => {
		try {
			console.log('Audio APP RouteHandlerFactory', req)

			if (req.method !== 'POST') {
				throw new AudioError(new Error('Only POST requests are supported'))
			}

			const requestBody = (await req.json()) as AudioRequestBody
			const audioResponse = await client.handle(requestBody, options)
			const headers = new Headers({
				'Cache-Control': 'no-store',
			})

			console.log('APP audioResponse', audioResponse)

			if ('responseFile' in audioResponse) {
				headers.set('Content-Type', audioResponse.contentType)
				headers.set(
					'Content-Disposition',
					`inline; filename="audio.${audioResponse.responseFormat}"`
				)

				return new NextResponse(audioResponse.responseFile, { headers })
			}

			return NextResponse.json(audioResponse.responseText, { headers })
		} catch (error) {
			throw new AudioError(error)
		}
	}

/**
 * @ignore
 */
const pageRouteHandlerFactory: (
	client: AudioClient
) => (
	req: NextApiRequest,
	res: NextApiResponse,
	options?: AudioOptions
) => Promise<void> =
	(client) =>
	async (
		req: NextApiRequest,
		res: NextApiResponse,
		options = {}
	): Promise<void> => {
		try {
			assertReqRes(req, res)
			console.log('Audio PAGES RouteHandlerFactory', req)
			res.setHeader('Cache-Control', 'no-store')
			const requestBody = req.body as AudioRequestBody
			const audioResponse = await client.handle(requestBody, options)
			console.log('PAGES audioResponse', audioResponse)

			if ('responseFile' in audioResponse) {
				res.setHeader('Content-Type', audioResponse.contentType)
				res.setHeader(
					'Content-Disposition',
					`inline; filename="audio.${audioResponse.responseFormat}"`
				)

				res.send(audioResponse.responseFile)
				return
			}

			res.json(audioResponse.responseText)
		} catch (error) {
			throw new AudioError(error)
		}
	}
