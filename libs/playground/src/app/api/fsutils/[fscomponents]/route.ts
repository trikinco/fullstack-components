import {
	handleFSComponents,
	handleNotFoundEnhancement,
	type FSCOptions,
} from '@fullstack-components/ai-components'

const fscOptions: FSCOptions = {
	notFoundEnhancer: handleNotFoundEnhancement({
		siteUrl: process.env.SITE_URL || '',
		openAiApiKey: process.env.OPENAI_API_KEY || '',
	}),
}

const fscHandler = handleFSComponents(fscOptions)

export { fscHandler as GET, fscHandler as POST }
