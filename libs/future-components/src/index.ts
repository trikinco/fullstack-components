/* eslint-disable unicorn/prevent-abbreviations */
import handlerFactory from './next-routing'
import { _init } from './init'

import type { HandleErrorParser } from './handlers/errorParser'
import type { HandleNotFoundEnhancement } from './handlers/notFoundEnhancer/notFoundEnhancer'
import type { FutureComponentsServer } from './init'
import type { HandlePrompt } from './handlers/prompt/promptHandler'
import { HandleDetectPii } from './handlers/detectPii/detectPiiHandlers'

// Because we use a cache and use clients,
// we may want to create a singleton for the library
// this does that

let instance: FutureComponentsServer | undefined

function getInstance(): FutureComponentsServer {
	if (instance) {
		return instance
	}

	instance = _init()
	return instance
}

// export the handler instances rather than the handler functions
const handlePromptRequest: HandlePrompt = ((
	...args: Parameters<HandlePrompt>
) => getInstance().handlePromptRequest(...args)) as HandlePrompt

const handleErrorRequest: HandleErrorParser = ((
	...args: Parameters<HandleErrorParser>
) => getInstance().handleErrorRequest(...args)) as HandleErrorParser

const handleNotFoundEnhancement: HandleNotFoundEnhancement = ((
	...args: Parameters<HandleNotFoundEnhancement>
) =>
	getInstance().handleNotFoundEnhancement(...args)) as HandleNotFoundEnhancement

const handleDetectPii: HandleDetectPii = ((
	...args: Parameters<HandleDetectPii>
) => getInstance().handlePiiDetection(...args)) as HandleDetectPii

const handleFSComponents = handlerFactory({
	handlePrompt: handlePromptRequest,
	handleErrorParser: handleErrorRequest,
	handleNotFoundEnhancement: handleNotFoundEnhancement,
	handleDetectPii: handleDetectPii,
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
export { AppRouteHandlerContext } from './nextjs-handlers'
export { NotFoundEnhancerOptions } from './handlers/notFoundEnhancer/notFoundEnhancer'
export {
	getInstance,
	handleErrorRequest,
	handleNotFoundEnhancement,
	handleFSComponents,
	handleDetectPii,
}

export { FutureComponentsServer } from './init'
export * from './types'
