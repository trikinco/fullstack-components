import errorParserHandler, { HandleErrorParser } from './handlers/errorParser'
import { ErrorClient } from './errorClient'

export type FutureComponentsServer = {
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

export function getInstance(): FutureComponentsServer {
	if (instance) {
		return instance
	}

	instance = init()
	return instance
}

export const handleErrorRequest: HandleErrorParser = ((
	...args: Parameters<HandleErrorParser>
) => getInstance().handleErrorRequest(...args)) as HandleErrorParser
