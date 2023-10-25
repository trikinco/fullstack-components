import errorParserHandler, {
	ErrorParseResponse,
	ErrorRequestBody,
	HandleErrorParser,
} from './handlers/errorParser'
import { ErrorClient } from './errorClient'
import handlerFactory from './next-routing'
import notFoundEnhancementHandler, {
	HandleNotFoundEnhancement,
	NotFoundEnhancerRequestBody,
	NotFoundEnhancerResponse,
} from './handlers/notFoundEnhancer/notFoundEnhancer'
import { NotFoundEnhancerClient } from './handlers/notFoundEnhancer/notFoundEnhancerClient'
import { useNotFoundEnhancement } from './handlers/notFoundEnhancer/useNotFoundEnhancement'

type FutureComponentsServer = {
	// some simple cache of requests to openai here?
	requestCache: Map<string, string>
	handleErrorRequest: HandleErrorParser
	handleNotFoundEnhancement: HandleNotFoundEnhancement
}
let instance: FutureComponentsServer | undefined = undefined
function init(): FutureComponentsServer {
	return {
		requestCache: new Map(), // this isnt really used, just thinking about caching
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

const handleErrorRequest: HandleErrorParser = ((
	...args: Parameters<HandleErrorParser>
) => getInstance().handleErrorRequest(...args)) as HandleErrorParser
const handleNotFoundEnhancement: HandleNotFoundEnhancement = ((
	...args: Parameters<HandleNotFoundEnhancement>
) =>
	getInstance().handleNotFoundEnhancement(...args)) as HandleNotFoundEnhancement

const handleFSComponents = handlerFactory({
	handleErrorParser: handleErrorRequest,
	handleNotFoundEnhancement: handleNotFoundEnhancement,
})

export {
	ErrorRequestBody,
	FutureComponentsServer,
	ErrorParseResponse,
	NotFoundEnhancerRequestBody,
	NotFoundEnhancerResponse,
	NotFoundEnhancerClient,
	ErrorClient,
	getInstance,
	handleErrorRequest,
	handleNotFoundEnhancement,
	handleFSComponents,
	useNotFoundEnhancement,
}
