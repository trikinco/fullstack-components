/* eslint-disable unicorn/prevent-abbreviations */
import errorParserHandler, { HandleErrorParser } from './handlers/errorParser'

import handlerFactory from './next-routing'
import notFoundEnhancementHandler, {
	HandleNotFoundEnhancement,
} from './handlers/notFoundEnhancer/notFoundEnhancer'
import { ErrorClient } from './errorClient'
import { NotFoundEnhancerClient } from './handlers/notFoundEnhancer/notFoundEnhancerClient'
import promptHandler, { HandlePrompt } from './handlers/prompt/promptHandler'
import { PromptClient } from './handlers/prompt/promptClient'

type FutureComponentsServer = {
	// some simple cache of requests to openai here?
	requestCache: Map<string, string>
	handlePromptRequest: HandlePrompt
	handleErrorRequest: HandleErrorParser
	handleNotFoundEnhancement: HandleNotFoundEnhancement
}

let instance: FutureComponentsServer | undefined

function init(): FutureComponentsServer {
	return {
		requestCache: new Map(), // this isnt really used, just thinking about caching
		handlePromptRequest: promptHandler(new PromptClient()),
		handleErrorRequest: errorParserHandler(new ErrorClient()),
		handleNotFoundEnhancement: notFoundEnhancementHandler(
			new NotFoundEnhancerClient()
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
export { NotFoundEnhancerClient } from './handlers/notFoundEnhancer/notFoundEnhancerClient'
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
