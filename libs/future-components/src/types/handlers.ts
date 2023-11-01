import type { NextApiHandler } from 'next'
import type {
	AppRouteHandler,
	NextAppRouterHandler,
	NextPageRouterHandler,
} from '../nextjs-handlers'
import type { PageRouterOnError, AppRouterOnError } from './routers'
import { FirstAIdHandler } from './firstAIdTypes'

// taken from auth0 nextjs
// to use - create a route in /api/fscomponents/[futc].ts
export type FSCOptions = {
	handlers?: FSCHandlers
	firstAId?: FirstAIdHandler[]
}
export type FSCHandlers = ApiHandlers | ErrorHandlers
export type ApiHandlers = {
	[key: string]: NextPageRouterHandler | NextAppRouterHandler
}

export type ErrorHandlers = {
	onError?: PageRouterOnError | AppRouterOnError
}

export type FSCApiHandler = (
	options?: FSCOptions
	// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
) => NextApiHandler | AppRouteHandler | any
