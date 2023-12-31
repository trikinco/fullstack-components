/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable unicorn/prevent-abbreviations */
import { isRequest } from './nextjs-handlers'

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import type { NextRequest } from 'next/server'
import type { AppRouteHandler, AppRouteHandlerContext } from './nextjs-handlers'
import type { PageRouterOnError, AppRouterOnError } from './types/routers'
import type {
	FSCApiHandler,
	FactoryHandlers,
	FSCOptions,
	ApiHandlers,
} from './types/handlers'

/**
 * @ignore
 */
const defaultPageRouterOnError: PageRouterOnError = (_req, res, error) => {
	console.error(error)
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
	res.status(error.status || 500).end()
}

/**
 * @ignore
 */
const defaultAppRouterOnError: AppRouterOnError = (_req, error) => {
	console.error(error)
}

/**
 * @ignore
 */
export default function handlerFactory({
	handleAudio,
	handleSelect,
	handleText,
	handleImage,
	handleBlock,
	handleHtmlPage,
	handlePrompt,
	handleErrorParser,
	handleNotFoundEnhancement,
}: FactoryHandlers): FSCApiHandler {
	return ({ onError, ...handlers }: FSCOptions = {}):
		| NextApiHandler<void>
		| AppRouteHandler => {
		const customHandlers: ApiHandlers = {
			audio: handleAudio,
			text: handleText,
			select: handleSelect,
			image: handleImage,
			block: handleBlock,
			htmlPage: handleHtmlPage,
			prompt: handlePrompt,
			errorEnhancer: handleErrorParser,
			notFoundEnhancer: handleNotFoundEnhancement,
			...handlers,
		}

		const appRouteHandler = appRouteHandlerFactory(
			customHandlers,
			onError as AppRouterOnError
		)
		const pageRouteHandler = pageRouteHandlerFactory(
			customHandlers,
			onError as PageRouterOnError
		)

		return (
			req: NextRequest | NextApiRequest,
			resOrCtx: NextApiResponse | AppRouteHandlerContext
		) => {
			if (isRequest(req)) {
				return appRouteHandler(
					req as NextRequest,
					resOrCtx as AppRouteHandlerContext
				)
			}
			return pageRouteHandler(
				req as NextApiRequest,
				resOrCtx as NextApiResponse
			)
		}
	}
}

/**
 * @ignore
 */
const appRouteHandlerFactory: (
	customHandlers: ApiHandlers,
	onError?: AppRouterOnError
) => AppRouteHandler =
	(customHandlers, onError) => async (req: NextRequest, ctx) => {
		const { params } = ctx
		let route = params.fscomponents

		if (Array.isArray(route)) {
			let otherRoutes
			;[route, ...otherRoutes] = route
			if (otherRoutes.length > 0) {
				// eslint-disable-next-line unicorn/no-null
				return new Response(null, { status: 404 })
			}
		}

		const handler =
			// eslint-disable-next-line no-prototype-builtins
			route && customHandlers.hasOwnProperty(route) && customHandlers[route]
		try {
			if (handler) {
				return await (handler as AppRouteHandler)(req, ctx)
			} else {
				// eslint-disable-next-line unicorn/no-null
				return new Response(null, { status: 404 })
			}
		} catch (error) {
			const res = await (onError || defaultAppRouterOnError)(req, error)
			// eslint-disable-next-line unicorn/no-null, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
			return res || new Response(null, { status: (error as any).status || 500 })
		}
	}

/**
 * @ignore
 */
const pageRouteHandlerFactory: (
	customHandlers: ApiHandlers,
	onError?: PageRouterOnError
) => NextApiHandler =
	(customHandlers, onError) =>
	async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
		let {
			query: { fscomponents: components },
		} = req
		// eslint-disable-next-line unicorn/consistent-destructuring
		console.log('query', { query: req?.query })
		if (Array.isArray(components)) {
			let otherRoutes
			;[components, ...otherRoutes] = components
			if (otherRoutes.length > 0) {
				res.status(404).end()
				return
			}
		}

		try {
			const handler =
				components &&
				// eslint-disable-next-line no-prototype-builtins
				customHandlers.hasOwnProperty(components) &&
				customHandlers[components]
			// eslint-disable-next-line unicorn/consistent-destructuring
			console.log('query and handler', { query: req?.query, handler })
			if (handler) {
				await (handler as NextApiHandler)(req, res)
			} else {
				console.log('Handler not found. Swapping to 404')
				res.status(404).end()
			}
		} catch (error) {
			await (onError || defaultPageRouterOnError)(req, res, error)
			if (!res.writableEnded) {
				// 200 is the default, so we assume it has not been set in the custom error handler if it equals 200
				res.status(res.statusCode === 200 ? 500 : res.statusCode).end()
			}
		}
	}
