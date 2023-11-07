import {
	Configuration,
	OpenAIApi,
	type CreateChatCompletionRequest,
	type CreateImageRequest,
} from 'openai-edge'

export const openai = new OpenAIApi(
	new Configuration({ apiKey: process.env.OPENAI_API_KEY })
)

type ChatCompletionOptions = Omit<CreateChatCompletionRequest, 'model'> & {
	model?: CreateChatCompletionRequest['model']
}

export const getChatCompletion = async (options: ChatCompletionOptions) => {
	const response = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		...options,
	})

	// OpenAIStream requires the raw response
	if (options.stream) {
		return response
	}

	return response.json()
}

export const getImageGeneration = async (options: CreateImageRequest) => {
	const response = await openai.createImage({
		size: '256x256', // Default to small images to save $
		...options,
	})

	return response.json()
}
