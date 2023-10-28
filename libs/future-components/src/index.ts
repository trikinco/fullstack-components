/* eslint-disable unicorn/prevent-abbreviations */
import { HandleErrorParser } from './handlers/errorParser'
import handlerFactory from './next-routing'
import { HandleNotFoundEnhancement } from './handlers/notFoundEnhancer/notFoundEnhancer'
import { FutureComponentsServer, _init } from './init'
import { HandlePrompt } from './handlers/prompt/promptHandler'

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

const handleFSComponents = handlerFactory({
	handlePrompt: handlePromptRequest,
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
export { AppRouteHandlerFnContext } from './nextjs-handlers'
export { NotFoundEnhancerOptions } from './handlers/notFoundEnhancer/notFoundEnhancer'
export {
	getInstance,
	handleErrorRequest,
	handleNotFoundEnhancement,
	handleFSComponents,
}

export { FutureComponentsServer } from './init'
