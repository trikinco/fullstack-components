import { ErrorClient } from './handlers/errorEnhancer/errorClient'
import errorParserHandler, {
	HandleErrorParser,
} from './handlers/errorEnhancer/errorParser'
import notFoundEnhancementHandler, {
	HandleNotFoundEnhancement,
} from './handlers/notFoundEnhancer/notFoundEnhancer'
import { NotFoundEnhancerContentGenerator } from './handlers/notFoundEnhancer/notFoundEnhancerContentGenerator'
import { NotFoundEnhancerSitemapSelector } from './handlers/notFoundEnhancer/notFoundEnhancerSitemapSelector'
import { PromptClient } from './handlers/prompt/promptClient'
import promptHandler, { HandlePrompt } from './handlers/prompt/promptHandler'
import { BlockClient } from './handlers/block/blockClient'
import blockHandler, { HandleBlock } from './handlers/block/blockHandler'
import imageHandler, { HandleImage } from './handlers/image/imageHandler'
import { ImageClient } from './handlers/image/imageClient'

const handleErrorRequest = errorParserHandler(new ErrorClient())
const requestCache = new Map<string, string>()
const handleNotFoundEnhancement = notFoundEnhancementHandler(
	new NotFoundEnhancerSitemapSelector(),
	new NotFoundEnhancerContentGenerator()
)
const handlePromptRequest = promptHandler(new PromptClient())
const handleBlockRequest = blockHandler(new BlockClient())
const handleImageRequest = imageHandler(new ImageClient())

export type FutureComponentsServer = {
	requestCache: Map<string, string>
	handleErrorRequest: HandleErrorParser
	handlePromptRequest: HandlePrompt
	handleImageRequest: HandleImage
	handleBlockRequest: HandleBlock
	handleNotFoundEnhancement: HandleNotFoundEnhancement
}
// Creates the instance of the library. We don't allow a custom one yet
// eslint-disable-next-line @typescript-eslint/naming-convention
export function _init(): FutureComponentsServer {
	return {
		requestCache, // this isn't really used, just thinking about caching
		handleErrorRequest,
		handlePromptRequest,
		handleImageRequest,
		handleBlockRequest,
		handleNotFoundEnhancement,
	}
}
