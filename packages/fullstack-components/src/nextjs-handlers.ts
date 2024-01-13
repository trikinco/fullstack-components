/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
// This is all borrowed from auth0 nextjs

import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextRequest } from 'next/server'
import type { IncomingMessage } from 'http'

export type AppRouteHandlerContext = {
	params: Record<string, string | string[]>
}
export type FullstackComponentsHandler<Opts> = Handler<Opts> & {
	(options?: Opts): Handler<Opts>
}
export type NextAppRouterHandler = (
	req: NextRequest,
	ctx: AppRouteHandlerContext
) => Promise<Response> | Response
export type NextPageRouterHandler = (
	req: NextApiRequest,
	res: NextApiResponse
) => Promise<unknown> | unknown

export type OptionsProvider<Opts> = (req: NextApiRequest | NextRequest) => Opts
export type Handler<Opts = any> = {
	(
		req: NextRequest,
		ctx: AppRouteHandlerContext,
		options?: Opts
	): Promise<Response> | Response
	(
		req: NextApiRequest,
		res: NextApiResponse,
		options?: Opts
	): Promise<unknown> | unknown
	(
		req: NextApiRequest | NextRequest,
		resOrOpts: NextApiResponse | AppRouteHandlerContext,
		options?: Opts
	): Promise<Response | unknown> | Response | unknown
}
/**
 * Handler function for app routes.
 */
export type AppRouteHandler<Options = any> = (
	/**
	 * Incoming request object.
	 */
	req: NextRequest,
	/**
	 * Context properties on the request (including the parameters if this was a
	 * dynamic route).
	 */
	ctx: AppRouteHandlerContext,

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
		appRouteHandler: AppRouteHandler<Opts>,
		pageRouteHandler: PageRouteHandlerFn<Opts>
	) =>
	(
		reqOrOptions: NextApiRequest | NextRequest | Opts,
		resOrCtx: NextApiResponse | AppRouteHandlerContext,
		options?: Opts
	) => {
		console.log('GET HANDLER', appRouteHandler)
		if (isRequest(reqOrOptions)) {
			console.log('isRequest - returning appRouteHandler')
			return appRouteHandler(
				reqOrOptions as NextRequest,
				resOrCtx as AppRouteHandlerContext,
				options
			)
		}
		if ('socket' in reqOrOptions) {
			console.log('isSocket - returning pageRouteHandler')
			return pageRouteHandler(
				reqOrOptions as NextApiRequest,
				resOrCtx as NextApiResponse,
				options
			)
		}
		console.log('returning inner handler')
		return (
			req: NextApiRequest | NextRequest,
			resOrCtxInner: NextApiResponse | AppRouteHandlerContext
		) => {
			console.log('GET HANDLER - inner')
			const opts = (
				typeof reqOrOptions === 'function'
					? (reqOrOptions as OptionsProvider<Opts>)(req)
					: reqOrOptions
			) as Opts

			if (isRequest(req)) {
				console.log('returning appRouteHandler')
				return appRouteHandler(
					req as NextRequest,
					resOrCtxInner as AppRouteHandlerContext,
					opts
				)
			}
			console.log('returning pageRouteHandler')
			return pageRouteHandler(
				req as NextApiRequest,
				resOrCtxInner as NextApiResponse,
				opts
			)
		}
	}
