/* eslint-disable unicorn/prevent-abbreviations */
import handlerFactory from './next-routing'
import { _init } from './init'

import type { HandleErrorParser } from './handlers/errorEnhancer/errorParser'
import type { HandleNotFoundEnhancement } from './handlers/notFoundEnhancer/notFoundEnhancer'
import type { FutureComponentsServer } from './init'
import type { HandlePrompt } from './handlers/prompt/promptHandler'
import type { HandleBlock } from './handlers/block/blockHandler'
import type { HandleImage } from './handlers/image/imageHandler'
import type { HandleSelect } from './handlers/select/selectHandler'
import type { HandleText } from './handlers/text/textHandler'

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

const handleImageRequest: HandleImage = ((...args: Parameters<HandleImage>) =>
	getInstance().handleImageRequest(...args)) as HandleImage

const handleTextRequest: HandleText = ((...args: Parameters<HandleText>) =>
	getInstance().handleTextRequest(...args)) as HandleText

const handleSelectRequest: HandleSelect = ((
	...args: Parameters<HandleSelect>
) => getInstance().handleSelectRequest(...args)) as HandleSelect

const handleBlockRequest: HandleBlock = ((...args: Parameters<HandleBlock>) =>
	getInstance().handleBlockRequest(...args)) as HandleBlock

const handleErrorRequest: HandleErrorParser = ((
	...args: Parameters<HandleErrorParser>
) => getInstance().handleErrorRequest(...args)) as HandleErrorParser

const handleNotFoundEnhancement: HandleNotFoundEnhancement = ((
	...args: Parameters<HandleNotFoundEnhancement>
) =>
	getInstance().handleNotFoundEnhancement(...args)) as HandleNotFoundEnhancement

const handleFSComponents = handlerFactory({
	handleText: handleTextRequest,
	handleSelect: handleSelectRequest,
	handleImage: handleImageRequest,
	handleBlock: handleBlockRequest,
	handlePrompt: handlePromptRequest,
	handleErrorParser: handleErrorRequest,
	handleNotFoundEnhancement: handleNotFoundEnhancement,
})

// Server components
export { Prompt } from './components/Prompt'
export { Image } from './components/Image'
export { Select } from './components/Select'

// Service utils
export { getPrompt } from './handlers/prompt/getters'
export { getBlock } from './handlers/block/getters'
export { getImage } from './handlers/image/getters'
export { getSelect } from './handlers/select/getters'
export { getText } from './handlers/text/getters'

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
export * from './handlers/prompt/models'
export * from './handlers/block/models'
export * from './handlers/image/models'
export * from './handlers/select/models'
export * from './handlers/text/models'
export { AppRouteHandlerContext } from './nextjs-handlers'

export {
	getInstance,
	handleTextRequest,
	handleSelectRequest,
	handleImageRequest,
	handleBlockRequest,
	handlePromptRequest,
	handleErrorRequest,
	handleNotFoundEnhancement,
	handleFSComponents,
}

export { FutureComponentsServer } from './init'
export * from './types'
