import type { ApiUrlEnum } from '../enums/ApiUrlEnum'
import type { NextApiHandler } from 'next'
import type {
	AppRouteHandler,
	NextAppRouterHandler,
	NextPageRouterHandler,
} from '../nextjs-handlers'
import type { PageRouterOnError, AppRouterOnError } from './routers'
import type { HandleErrorParser } from '../handlers/errorEnhancer/errorParser'
import type { HandleNotFoundEnhancement } from '../handlers/notFoundEnhancer/notFoundEnhancer'
import type { HandlePrompt } from '../handlers/prompt/promptHandler'
import type { HandleBlock } from '../handlers/block/blockHandler'
import type { HandleImage } from '../handlers/image/imageHandler'
import type { HandleSelect } from '../handlers/select/selectHandler'
import type { HandleText } from '../handlers/text/textHandler'
import type { HandleHtmlPage } from '../handlers/htmlPage/htmlPageHandler'
import type { HandleAudio } from '../handlers/audio/audioHandler'

export type FactoryHandlers = {
	handleAudio: HandleAudio
	handleSelect: HandleSelect
	handleText: HandleText
	handleImage: HandleImage
	handleBlock: HandleBlock
	handleHtmlPage: HandleHtmlPage
	handlePrompt: HandlePrompt
	handleErrorParser: HandleErrorParser
	handleNotFoundEnhancement: HandleNotFoundEnhancement
}

/**
 * @ignore
 */
export type ApiHandlers = {
	[key: string]: NextPageRouterHandler | NextAppRouterHandler
} & Partial<{
	[key in keyof typeof ApiUrlEnum]: NextPageRouterHandler | NextAppRouterHandler
}>

/**
 * @ignore
 */
export type ErrorHandlers = {
	onError?: PageRouterOnError | AppRouterOnError
}

/**
 * API route handlers and options for `handleFSComponents`,
 * responsible for configuring and creating routes at `/api/fsutils/[...fscomponents]`
 */
export type FSCOptions = ApiHandlers | ErrorHandlers

export type FSCApiHandler = (
	userHandlers?: FSCOptions
	// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
) => NextApiHandler | AppRouteHandler | any
