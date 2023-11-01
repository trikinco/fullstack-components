import { ErrorClient } from './errorClient'
import { DetectPiiClient } from './handlers/detectPii/detectPiiClient'
import detectPiiHandler, {
	HandleDetectPii,
} from './handlers/detectPii/detectPiiHandlers'
import errorParserHandler, { HandleErrorParser } from './handlers/errorParser'
import notFoundEnhancementHandler, {
	HandleNotFoundEnhancement,
} from './handlers/notFoundEnhancer/notFoundEnhancer'
import { NotFoundEnhancerContentGenerator } from './handlers/notFoundEnhancer/notFoundEnhancerContentGenerator'
import { NotFoundEnhancerSitemapSelector } from './handlers/notFoundEnhancer/notFoundEnhancerSitemapSelector'
import { PromptClient } from './handlers/prompt/promptClient'
import promptHandler, { HandlePrompt } from './handlers/prompt/promptHandler'

const handleErrorRequest = errorParserHandler(new ErrorClient())
const requestCache = new Map<string, string>()
const handleNotFoundEnhancement = notFoundEnhancementHandler(
	new NotFoundEnhancerSitemapSelector(),
	new NotFoundEnhancerContentGenerator()
)
const handlePromptRequest = promptHandler(new PromptClient())
const handlePiiDetection = detectPiiHandler(new DetectPiiClient())

export type FutureComponentsServer = {
	requestCache: Map<string, string>
	handleErrorRequest: HandleErrorParser
	handlePromptRequest: HandlePrompt
	handleNotFoundEnhancement: HandleNotFoundEnhancement
	handlePiiDetection: HandleDetectPii
}
// Creates the instance of the library. We don't allow a custom one yet
// eslint-disable-next-line @typescript-eslint/naming-convention
export function _init(): FutureComponentsServer {
	return {
		requestCache, // this isn't really used, just thinking about caching
		handleErrorRequest,
		handlePromptRequest,
		handleNotFoundEnhancement,
		handlePiiDetection,
	}
}
