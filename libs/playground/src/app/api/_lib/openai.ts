import OpenAI from 'openai'

export const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || '',
})

export const getChatCompletion = (
	options: Omit<
		OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming,
		'model'
	>
) => {
	return openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		...options,
	})
}
