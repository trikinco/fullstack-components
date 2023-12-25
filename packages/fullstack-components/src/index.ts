/* eslint-disable unicorn/prevent-abbreviations */
import handlerFactory from './next-routing'
import { _init } from './init'

import type { HandleErrorParser } from './handlers/errorEnhancer/errorParser'
import type { HandleNotFoundEnhancement } from './handlers/notFoundEnhancer/notFoundEnhancer'
import type { FullstackComponentsServer } from './init'
import type { HandlePrompt } from './handlers/prompt/promptHandler'
import type { HandleBlock } from './handlers/block/blockHandler'
import type { HandleImage } from './handlers/image/imageHandler'
import type { HandleSelect } from './handlers/select/selectHandler'
import type { HandleText } from './handlers/text/textHandler'
import type { HandleHtmlPage } from './handlers/htmlPage/htmlPageHandler'
import type { HandleAudio } from './handlers/audio/audioHandler'

// Because we use a cache and use clients,
// we may want to create a singleton for the library
// this does that

let instance: FullstackComponentsServer | undefined

function getInstance(): FullstackComponentsServer {
	if (instance) {
		return instance
	}

	instance = _init()
	return instance
}

// export the handler instances rather than the handler functions

const handleAudioRequest: HandleAudio = ((...args: Parameters<HandleAudio>) =>
	getInstance().handleAudioRequest(...args)) as HandleAudio

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

const handleHtmlPageRequest: HandleHtmlPage = ((
	...args: Parameters<HandleHtmlPage>
) => getInstance().handleHtmlPageRequest(...args)) as HandleHtmlPage

const handleErrorRequest: HandleErrorParser = ((
	...args: Parameters<HandleErrorParser>
) => getInstance().handleErrorRequest(...args)) as HandleErrorParser

const handleNotFoundEnhancement: HandleNotFoundEnhancement = ((
	...args: Parameters<HandleNotFoundEnhancement>
) =>
	getInstance().handleNotFoundEnhancement(...args)) as HandleNotFoundEnhancement

const handleFSComponents = handlerFactory({
	handleAudio: handleAudioRequest,
	handleText: handleTextRequest,
	handleSelect: handleSelectRequest,
	handleImage: handleImageRequest,
	handleHtmlPage: handleHtmlPageRequest,
	handleBlock: handleBlockRequest,
	handlePrompt: handlePromptRequest,
	handleErrorParser: handleErrorRequest,
	handleNotFoundEnhancement: handleNotFoundEnhancement,
})

// Server components
export { Audio } from './components/Audio'
export { Track, Cue } from './components/Track'
export { Transcript } from './components/Transcript'
export { Prompt } from './components/Prompt'
export { Image } from './components/Image/Image'
export { Select } from './components/Select'
export { Text } from './components/Text'

// Public library API for server
export { AudioClient, getAudio } from './handlers/audio/audioClient'
export { TextClient, getText } from './handlers/text/textClient'
export { SelectClient, getSelect } from './handlers/select/selectClient'
export { PromptClient, getPrompt } from './handlers/prompt/promptClient'
export {
	NotFoundEnhancerSitemapSelector,
	getNotFoundSitemapSelector,
} from './handlers/notFoundEnhancer/notFoundEnhancerSitemapSelector'
export {
	NotFoundEnhancerContentGenerator,
	getNotFoundContentGenerator,
} from './handlers/notFoundEnhancer/notFoundEnhancerContentGenerator'
export { ImageClient, getImage } from './handlers/image/imageClient'
export { getEnhancedImage } from './handlers/image/getters'
export { HtmlPageClient, getHtmlPage } from './handlers/htmlPage/htmlPageClient'
export {
	ErrorClient,
	getErrorEnhancement,
} from './handlers/errorEnhancer/errorClient'
export { BlockClient, getBlock } from './handlers/block/blockClient'

// Public library types
export { ChatGptCompletionResponse } from './chatGptService'
export { ImageGenerationResponse } from './imageGenerationService'
export { AudioTextResponse as AudioResponse } from './audioService'
export * from './handlers/audio/models'
export * from './handlers/errorEnhancer/models'
export * from './handlers/notFoundEnhancer/models'
export * from './handlers/prompt/models'
export * from './handlers/block/models'
export * from './handlers/image/models'
export * from './handlers/select/models'
export * from './handlers/text/models'
export * from './handlers/htmlPage/models'
export { AppRouteHandlerContext } from './nextjs-handlers'

export {
	getInstance,
	handleAudioRequest,
	handleTextRequest,
	handleSelectRequest,
	handleImageRequest,
	handleBlockRequest,
	handleHtmlPageRequest,
	handlePromptRequest,
	handleErrorRequest,
	handleNotFoundEnhancement,
	handleFSComponents,
}

export { FullstackComponentsServer } from './init'
export * from './types'
