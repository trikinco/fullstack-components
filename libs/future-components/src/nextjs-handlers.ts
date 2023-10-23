// This is all borrowed from auth0 nextjs

import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest } from 'next/server'
import type { IncomingMessage } from 'http'

export type AppRouteHandlerFnContext = {
	params: Record<string, string | string[]>
}
export type FutureCompHandler<Opts> = Handler<Opts> & {
	(options?: Opts): Handler<Opts>
}
export type NextAppRouterHandler = (
	req: NextRequest,
	ctx: AppRouteHandlerFnContext
) => Promise<Response> | Response
export type NextPageRouterHandler = (
	req: NextApiRequest,
	res: NextApiResponse
) => Promise<unknown> | unknown

export type OptionsProvider<Opts> = (req: NextApiRequest | NextRequest) => Opts
export type Handler<Opts = any> = {
	(
		req: NextRequest,
		ctx: AppRouteHandlerFnContext,
		options?: Opts
	): Promise<Response> | Response
	(
		req: NextApiRequest,
		res: NextApiResponse,
		options?: Opts
	): Promise<unknown> | unknown
	(
		req: NextApiRequest | NextRequest,
		resOrOpts: NextApiResponse | AppRouteHandlerFnContext,
		options?: Opts
	): Promise<Response | unknown> | Response | unknown
}
/**
 * Handler function for app routes.
 */
export type AppRouteHandlerFn<Options = any> = (
	/**
	 * Incoming request object.
	 */
	req: NextRequest,
	/**
	 * Context properties on the request (including the parameters if this was a
	 * dynamic route).
	 */
	ctx: AppRouteHandlerFnContext,

	opts?: Options
) => Promise<Response> | Response

/**
 * Handler function for app routes.
 */
export type PageRouteHandlerFn<Options> = (
	/**
	 * Incoming request object.
	 */
	req: NextApiRequest,
	/**
	 * Context properties on the request (including the parameters if this was a
	 * dynamic route).
	 */
	res: NextApiResponse,

	opts?: Options
) => Promise<void> | void

type Req =
	| IncomingMessage
	| NextApiRequest
	| NextRequest
	| Request
	| Record<string, any>

export const isRequest = (req: Req): boolean => {
	return (
		req instanceof Request ||
		req.headers instanceof Headers ||
		typeof (req as Request).bodyUsed === 'boolean'
	)
}
export const assertReqRes = (req: unknown, res: unknown): void => {
	if (!req) {
		throw new Error('Request is not available')
	}
	if (!res) {
		throw new Error('Response is not available')
	}
}
export const isNextApiRequest = (req: Req) => {
	return !isRequest(req) && 'query' in req
}

export const getHandler =
	<Opts extends Record<string, any>>(
		appRouteHandler: AppRouteHandlerFn<Opts>,
		pageRouteHandler: PageRouteHandlerFn<Opts>
	) =>
	(
		reqOrOptions: NextApiRequest | NextRequest | Opts,
		resOrCtx: NextApiResponse | AppRouteHandlerFnContext,
		options?: Opts
	) => {
		if (isRequest(reqOrOptions)) {
			return appRouteHandler(
				reqOrOptions as NextRequest,
				resOrCtx as AppRouteHandlerFnContext,
				options
			)
		}
		if ('socket' in reqOrOptions) {
			return pageRouteHandler(
				reqOrOptions as NextApiRequest,
				resOrCtx as NextApiResponse,
				options
			)
		}
		return (
			req: NextApiRequest | NextRequest,
			resOrCtxInner: NextApiResponse | AppRouteHandlerFnContext
		) => {
			const opts = (
				typeof reqOrOptions === 'function'
					? (reqOrOptions as OptionsProvider<Opts>)(req)
					: reqOrOptions
			) as Opts

			if (isRequest(req)) {
				return appRouteHandler(
					req as NextRequest,
					resOrCtxInner as AppRouteHandlerFnContext,
					opts
				)
			}
			return pageRouteHandler(
				req as NextApiRequest,
				resOrCtxInner as NextApiResponse,
				opts
			)
		}
	}
