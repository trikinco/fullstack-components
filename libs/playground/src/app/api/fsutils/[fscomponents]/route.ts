import {
	handleFSComponents,
	handleNotFoundEnhancement,
	type FSCOptions,
} from '@fullstack-components/ai-components'

const fscOptions: FSCOptions = {
	handlers: {
		// was this a really bad name for this? i think so :D
		// maybe change before public release notFoundEnhancer
		['not-found-enhancer']: handleNotFoundEnhancement({
			siteUrl: process.env.URL_HOST || '',
			openAiApiKey: process.env.OPENAI_API_KEY || '',
		}),
	},
}

const fscHandler = handleFSComponents(fscOptions)

export { fscHandler as GET, fscHandler as POST }
