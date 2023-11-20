import {
	handleFSComponents,
	handleBlockRequest,
	handlePromptRequest,
	handleNotFoundEnhancement,
	type FSCOptions,
} from '@trikinco/fullstack-components'

const config = {
	siteUrl: process.env.SITE_URL || '',
	openAiApiKey: process.env.OPENAI_API_KEY || '',
}

const fscOptions: FSCOptions = {
	handleBlock: handleBlockRequest(config),
	handlePrompt: handlePromptRequest(config),
	notFoundEnhancer: handleNotFoundEnhancement(config),
}

const fscHandler = handleFSComponents(fscOptions)

export { fscHandler as GET, fscHandler as POST }
