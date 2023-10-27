/* eslint-disable unicorn/prevent-abbreviations */
import errorParserHandler, { HandleErrorParser } from './handlers/errorParser'

import handlerFactory from './next-routing'
import notFoundEnhancementHandler, {
	HandleNotFoundEnhancement,
} from './handlers/notFoundEnhancer/notFoundEnhancer'
import { ErrorClient } from './errorClient'
import { NotFoundEnhancerSitemapSelector } from './handlers/notFoundEnhancer/notFoundEnhancerSitemapSelector'
import { NotFoundEnhancerContentGenerator } from './handlers/notFoundEnhancer/notFoundEnhancerContentGenerator'

type FutureComponentsServer = {
	// some simple cache of requests to openai here?
	requestCache: Map<string, string>
	handleErrorRequest: HandleErrorParser
	handleNotFoundEnhancement: HandleNotFoundEnhancement
}
let instance: FutureComponentsServer | undefined
function init(): FutureComponentsServer {
	return {
		requestCache: new Map(), // this isnt really used, just thinking about caching
		handleErrorRequest: errorParserHandler(new ErrorClient()),
		handleNotFoundEnhancement: notFoundEnhancementHandler(
			new NotFoundEnhancerSitemapSelector(),
			new NotFoundEnhancerContentGenerator()
		),
	}
}
function getInstance(): FutureComponentsServer {
	if (instance) {
		return instance
	}

	instance = init()
	return instance
}

const handleErrorRequest: HandleErrorParser = ((
	...args: Parameters<HandleErrorParser>
) => getInstance().handleErrorRequest(...args)) as HandleErrorParser
const handleNotFoundEnhancement: HandleNotFoundEnhancement = ((
	...args: Parameters<HandleNotFoundEnhancement>
) =>
	getInstance().handleNotFoundEnhancement(...args)) as HandleNotFoundEnhancement

const handleFSComponents = handlerFactory({
	handleErrorParser: handleErrorRequest,
	handleNotFoundEnhancement: handleNotFoundEnhancement,
})
// public library api for server
export { NotFoundEnhancerSitemapSelector } from './handlers/notFoundEnhancer/notFoundEnhancerSitemapSelector'
export { NotFoundEnhancerContentGenerator } from './handlers/notFoundEnhancer/notFoundEnhancerContentGenerator'
export { ErrorClient } from './errorClient'
export { ErrorParseResponse, ErrorRequestBody } from './handlers/errorParser'
export {
	NotFoundEnhancerRequestBody,
	NotFoundEnhancerResponse,
} from './handlers/notFoundEnhancer/notFoundEnhancer'
export {
	FutureComponentsServer,
	getInstance,
	handleErrorRequest,
	handleNotFoundEnhancement,
	handleFSComponents,
}
