import OpenAI from 'openai'

export const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || '',
})

type ChatCompletionOptions = Omit<
	OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming,
	'model'
> & {
	model?: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming['model']
}

export const getChatCompletion = (options: ChatCompletionOptions) => {
	return openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		...options,
	})
}
