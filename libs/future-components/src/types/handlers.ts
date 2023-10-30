import type { NextApiHandler } from 'next'
import type {
	AppRouteHandler,
	NextAppRouterHandler,
	NextPageRouterHandler,
} from '../nextjs-handlers'
import type { PageRouterOnError, AppRouterOnError } from './routers'

// taken from auth0 nextjs
// to use - create a route in /api/fscomponents/[futc].ts
export type FSCOptions = ApiHandlers | ErrorHandlers

/**
 * @ignore
 */
export type ApiHandlers = {
	[key: string]: NextPageRouterHandler | NextAppRouterHandler
}

/**
 * @ignore
 */
export type ErrorHandlers = {
	onError?: PageRouterOnError | AppRouterOnError
}

export type FSCApiHandler = (
	userHandlers?: FSCOptions
	// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
) => NextApiHandler | AppRouteHandler | any
