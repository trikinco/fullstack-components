import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextRequest } from 'next/server'

export type PageRouterOnError = (
	req: NextApiRequest,
	res: NextApiResponse,
	error: any
) => Promise<void> | void

export type AppRouterOnError = (
	req: NextRequest,
	error: any
) => Promise<Response | void> | Response | void
