import errorParserHandler, {
	ErrorRequestBody,
	HandleErrorParser,
} from './handlers/errorParser'
import { ErrorClient } from './errorClient'
import handlerFactory from './next-routing'

type FutureComponentsServer = {
	// some simple cache of requests to openai here?
	requestCache: Map<string, string>
	handleErrorRequest: HandleErrorParser
}
let instance: FutureComponentsServer | undefined = undefined
function init(): FutureComponentsServer {
	return {
		requestCache: new Map(), // this isnt really used, just thinking about caching
		handleErrorRequest: errorParserHandler(new ErrorClient()),
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

const handleFSComponents = handlerFactory({
	handleErrorParser: handleErrorRequest,
})

export {
	ErrorRequestBody,
	FutureComponentsServer,
	getInstance,
	handleErrorRequest,
	handleFSComponents,
}
