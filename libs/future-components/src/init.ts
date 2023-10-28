import { ErrorClient } from './errorClient'
import errorParserHandler, { HandleErrorParser } from './handlers/errorParser'
import notFoundEnhancementHandler, {
	HandleNotFoundEnhancement,
} from './handlers/notFoundEnhancer/notFoundEnhancer'
import { NotFoundEnhancerContentGenerator } from './handlers/notFoundEnhancer/notFoundEnhancerContentGenerator'
import { NotFoundEnhancerSitemapSelector } from './handlers/notFoundEnhancer/notFoundEnhancerSitemapSelector'

const handleErrorRequest = errorParserHandler(new ErrorClient())
const requestCache = new Map<string, string>()
const handleNotFoundEnhancement = notFoundEnhancementHandler(
	new NotFoundEnhancerSitemapSelector(),
	new NotFoundEnhancerContentGenerator()
)
export type FutureComponentsServer = {
	requestCache: Map<string, string>
	handleErrorRequest: HandleErrorParser
	handleNotFoundEnhancement: HandleNotFoundEnhancement
}
// Creates the instance of the library. We don't allow a custom one yet
// eslint-disable-next-line @typescript-eslint/naming-convention
export function _init(): FutureComponentsServer {
	return {
		requestCache, // this isn't really used, just thinking about caching
		handleErrorRequest,
		handleNotFoundEnhancement,
	}
}
