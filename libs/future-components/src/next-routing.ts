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

// taken from auth0 nextjs
// to use - create a route in /api/future-components/[futc].ts
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

export type HandleAuth = (
	userHandlers?: Handlers
) => NextApiHandler | AppRouteHandlerFn | any

/**
 * Error handler for the default auth routes.
 *
 * Use this to define an error handler for all the default routes in a single place. For example:
 *
 * ```js
 * export default handleAuth({
 *   onError(req, res, error) {
 *     errorLogger(error);
 *     // You can finish the response yourself if you want to customize
 *     // the status code or redirect the user
 *     // res.writeHead(302, {
 *     //     Location: '/custom-error-page'
 *     // });
 *     // res.end();
 *   }
 * });
 * ```
 *
 * @category Server
 */
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
	handleErrorParser,
}: {
	handleErrorParser: HandleErrorParser
}): HandleAuth {
	return ({ onError, ...handlers }: Handlers = {}):
		| NextApiHandler<void>
		| AppRouteHandlerFn => {
		const customHandlers: ApiHandlers = {
			parseError: handleErrorParser,
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
		let route = params.auth0

		if (Array.isArray(route)) {
			let otherRoutes
			;[route, ...otherRoutes] = route
			if (otherRoutes.length) {
				return new Response(null, { status: 404 })
			}
		}

		const handler =
			route && customHandlers.hasOwnProperty(route) && customHandlers[route]
		try {
			if (handler) {
				return await (handler as AppRouteHandlerFn)(req, ctx)
			} else {
				return new Response(null, { status: 404 })
			}
		} catch (error) {
			const res = await (onError || defaultAppRouterOnError)(req, error)
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
			query: { auth0: route },
		} = req

		if (Array.isArray(route)) {
			let otherRoutes
			;[route, ...otherRoutes] = route
			if (otherRoutes.length) {
				res.status(404).end()
				return
			}
		}

		try {
			const handler =
				route && customHandlers.hasOwnProperty(route) && customHandlers[route]
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