import { runChatCompletion } from '../../chatGptService'
import { OPENAI_API_KEY } from '../../utils/constants'
import type { PromptRequestBody, PromptOptions } from './models'

export class PromptClient {
	public handle = async (
		request: PromptRequestBody,
		options: PromptOptions
	) => {
		console.log('handling prompt request', request)

		return await runChatCompletion(
			[
				{
					role: 'user',
					content: request.prompt || '',
				},
			],
			{
				openAIApiKey: options.openAiApiKey || OPENAI_API_KEY,
			}
		)
	}
}
