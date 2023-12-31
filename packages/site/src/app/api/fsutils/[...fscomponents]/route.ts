import {
	handleFSComponents,
	handleImageRequest,
	handleTextRequest,
	handleSelectRequest,
	handleBlockRequest,
	handlePromptRequest,
	handleErrorRequest,
	handleHtmlPageRequest,
	handleNotFoundEnhancement,
	handleAudioRequest,
	type FSCOptions,
} from '@trikinco/fullstack-components'

const config = {
	openAiApiKey: process.env.OPENAI_API_KEY || '',
}

const fscOptions: FSCOptions = {
	audio: handleAudioRequest(config),
	prompt: handlePromptRequest(config),
	errorEnhancer: handleErrorRequest({
		...config,
		appContext: 'http web app',
		isProd: true,
	}),
	notFoundEnhancer: handleNotFoundEnhancement({
		...config,
		siteUrl: process.env.NEXT_PUBLIC_HOST || '',
	}),
	select: handleSelectRequest(config),
	image: handleImageRequest(config),
	block: handleBlockRequest(config),
	text: handleTextRequest(config),
	htmlPage: handleHtmlPageRequest(config),
}

const fscHandler = handleFSComponents(fscOptions)

export { fscHandler as GET, fscHandler as POST }
