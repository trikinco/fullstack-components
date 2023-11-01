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
import { DetectPiiClient } from './detectPiiClient'

export class DetectPiiRequestBody {
	content?: string
}
export type DetectPiiResponse = {
	piiFound: string[]
}
export type DetectPiiOptions = {
	openAiApiKey: string
}
export class DetectPiiError extends Error {
	public rootCause: string

	constructor(error: any) {
		super('Error running PII detection')
		this.name = 'DetectPiiError'
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.rootCause = error.message
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.stack = error.stack
	}
}

export type DetectPiiHandler = Handler<DetectPiiOptions>
export type HandleDetectPii = FutureCompHandler<DetectPiiOptions>

export default function detectPiiHandler(
	detectPiiClient: DetectPiiClient
): HandleDetectPii {
	const appRouteHandler = appRouteHandlerFactory(detectPiiClient)
	const pageRouteHandler = pageRouteHandlerFactory(detectPiiClient)

	// eslint-disable-next-line sonarjs/prefer-immediate-return
	const foundHandler = getHandler<DetectPiiOptions>(
		appRouteHandler,
		pageRouteHandler
	) as HandleDetectPii
	console.log('foundHandler', foundHandler)
	return foundHandler
}

const appRouteHandlerFactory: (
	detectPiiClient: DetectPiiClient
) => (
	req: NextRequest,
	ctx: AppRouteHandlerContext,
	options?: DetectPiiOptions
) => Promise<Response> | Response =
	(detectPiiClient) => async (req, _ctx, options) => {
		console.log('Running handler')
		try {
			const res = new NextResponse()
			console.log('Detect PII APP RouteHandlerFactory')
			if (req.method !== 'POST') {
				throw new DetectPiiError(new Error('Only POST requests are supported'))
			}
			if (!options) {
				throw new DetectPiiError(new Error('No options provided'))
			}
			res.headers.set('Cache-Control', 'no-store')
			const requestBody = (await req.json()) as DetectPiiRequestBody
			console.log('requestBody', requestBody)
			const detectedPii = await detectPiiClient.handle(requestBody, options)

			const response = JSON.parse(detectedPii.responseText) as DetectPiiResponse

			return NextResponse.json(response, res)
		} catch (error) {
			console.error(error, 'handler error')
			throw new DetectPiiError(error)
		}
	}

const pageRouteHandlerFactory: (
	detectPiiClient: DetectPiiClient
) => (
	req: NextApiRequest,
	res: NextApiResponse,
	options?: DetectPiiOptions
) => Promise<void> =
	(detectPiiClient) =>
	async (
		req: NextApiRequest,
		res: NextApiResponse,
		options?: DetectPiiOptions
	): Promise<void> => {
		try {
			assertReqRes(req, res)
			console.log('Detect PII PAGES RouteHandlerFactory')
			if (req.method !== 'POST') {
				throw new DetectPiiError(new Error('Only POST requests are supported'))
			}
			if (!options) {
				throw new DetectPiiError(new Error('No options provided'))
			}
			res.setHeader('Cache-Control', 'no-store')
			const requestBody = req.body as DetectPiiRequestBody
			const detectedPii = await detectPiiClient.handle(requestBody, options)

			const result = JSON.parse(detectedPii.responseText) as DetectPiiResponse
			res.json(result)
		} catch (error) {
			throw new DetectPiiError(error)
		}
	}
