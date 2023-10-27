/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable unicorn/prevent-abbreviations */
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { NextRequest } from 'next/server'
import {
	AppRouteHandlerFn,
	AppRouteHandlerFnContext,
	NextAppRouterHandler,
	NextPageRouterHandler,
	isRequest,
} from './nextjs-handlers'
import { HandleErrorParser } from './handlers/errorParser'

import { HandleNotFoundEnhancement } from './handlers/notFoundEnhancer/notFoundEnhancer'
import { HandlePrompt } from './handlers/prompt/promptHandler'

// taken from auth0 nextjs
// to use - create a route in /api/fscomponents/[futc].ts
export type Handlers = ApiHandlers | ErrorHandlers

/**
 * @ignore
 */
type ApiHandlers = {
	[key: string]: NextPageRouterHandler | NextAppRouterHandler
}

/**
 * @ignore
 */
type ErrorHandlers = {
	onError?: PageRouterOnError | AppRouterOnError
}

export type HandleFSComponents = (
	userHandlers?: Handlers
	// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
) => NextApiHandler | AppRouteHandlerFn | any

export type PageRouterOnError = (
	req: NextApiRequest,
	res: NextApiResponse,
	error: any
) => Promise<void> | void
export type AppRouterOnError = (
	req: NextRequest,
	error: any
) => Promise<Response | void> | Response | void

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
	handlePrompt,
	handleErrorParser,
	handleNotFoundEnhancement,
}: {
	handlePrompt: HandlePrompt
	handleErrorParser: HandleErrorParser
	handleNotFoundEnhancement: HandleNotFoundEnhancement
}): HandleFSComponents {
	return ({ onError, ...handlers }: Handlers = {}):
		| NextApiHandler<void>
		| AppRouteHandlerFn => {
		const customHandlers: ApiHandlers = {
			prompt: handlePrompt,
			parseError: handleErrorParser,
			['not-found-enhancer']: handleNotFoundEnhancement,
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
			resOrCtx: NextApiResponse | AppRouteHandlerFnContext
		) => {
			if (isRequest(req)) {
				return appRouteHandler(
					req as NextRequest,
					resOrCtx as AppRouteHandlerFnContext
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
) => AppRouteHandlerFn =
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
				return await (handler as AppRouteHandlerFn)(req, ctx)
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
			if (handler) {
				await (handler as NextApiHandler)(req, res)
			} else {
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
