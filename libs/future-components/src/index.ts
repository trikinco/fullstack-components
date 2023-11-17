/* eslint-disable unicorn/prevent-abbreviations */
import handlerFactory from './next-routing'
import { _init } from './init'

import type { HandleErrorParser } from './handlers/errorEnhancer/errorParser'
import type { HandleNotFoundEnhancement } from './handlers/notFoundEnhancer/notFoundEnhancer'
import type { FutureComponentsServer } from './init'
import type { HandlePrompt } from './handlers/prompt/promptHandler'

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

// Server components
export { Prompt } from './components/Prompt'
export { Image } from './components/Image'
export { Select } from './components/Select'

// public library api for server
export { NotFoundEnhancerSitemapSelector } from './handlers/notFoundEnhancer/notFoundEnhancerSitemapSelector'
export { NotFoundEnhancerContentGenerator } from './handlers/notFoundEnhancer/notFoundEnhancerContentGenerator'
export { ErrorClient } from './handlers/errorEnhancer/errorClient'
export {
	ErrorEnhancementResponse,
	ErrorEnhancementRequestBody,
	ErrorParserOptions,
} from './handlers/errorEnhancer/models'
export {
	NotFoundEnhancerRequestBody,
	NotFoundEnhancerResponse,
	NotFoundEnhancerOptions,
} from './handlers/notFoundEnhancer/models'
export {
	PromptRequestBody,
	PromptResponse,
	PromptOptions,
} from './handlers/prompt/models'
export { AppRouteHandlerContext } from './nextjs-handlers'

export {
	getInstance,
	handlePromptRequest,
	handleErrorRequest,
	handleNotFoundEnhancement,
	handleFSComponents,
}

export { FutureComponentsServer } from './init'
export * from './types'
