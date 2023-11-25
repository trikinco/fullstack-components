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
import selectHandler, { HandleSelect } from './handlers/select/selectHandler'
import { SelectClient } from './handlers/select/selectClient'
import textHandler, { HandleText } from './handlers/text/textHandler'
import { TextClient } from './handlers/text/textClient'
import htmlPageHandler, {
	HandleHtmlPage,
} from './handlers/htmlPage/htmlPageHandler'
import { HtmlPageClient } from './handlers/htmlPage/htmlPageClient'

const requestCache = new Map<string, string>()
const handleNotFoundEnhancement = notFoundEnhancementHandler(
	new NotFoundEnhancerSitemapSelector(),
	new NotFoundEnhancerContentGenerator()
)
const handleErrorRequest = errorParserHandler(new ErrorClient())
const handlePromptRequest = promptHandler(new PromptClient())
const handleBlockRequest = blockHandler(new BlockClient())
const handleImageRequest = imageHandler(new ImageClient())
const handleSelectRequest = selectHandler(new SelectClient())
const handleTextRequest = textHandler(new TextClient())
const handleHtmlPageRequest = htmlPageHandler(new HtmlPageClient())

export type FutureComponentsServer = {
	requestCache: Map<string, string>
	handleErrorRequest: HandleErrorParser
	handlePromptRequest: HandlePrompt
	handleTextRequest: HandleText
	handleSelectRequest: HandleSelect
	handleImageRequest: HandleImage
	handleBlockRequest: HandleBlock
	handleHtmlPageRequest: HandleHtmlPage
	handleNotFoundEnhancement: HandleNotFoundEnhancement
}
// Creates the instance of the library. We don't allow a custom one yet
// eslint-disable-next-line @typescript-eslint/naming-convention
export function _init(): FutureComponentsServer {
	return {
		requestCache, // this isn't really used, just thinking about caching
		handleErrorRequest,
		handlePromptRequest,
		handleTextRequest,
		handleSelectRequest,
		handleImageRequest,
		handleBlockRequest,
		handleHtmlPageRequest,
		handleNotFoundEnhancement,
	}
}
