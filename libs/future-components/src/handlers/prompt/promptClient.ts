import { runChatCompletion } from '../../chatGptService'
import { OPENAI_API_KEY } from '../../utils/constants'
import type { PromptRequestBody, PromptOptions } from './models'
import type { ChatMessage } from '../../types/ChatMessage'

export class PromptClient {
	public handle = async (
		request: PromptRequestBody,
		options: PromptOptions
	) => {
		console.log('handling prompt request', request)
		const messages: ChatMessage[] = []

		if (request.messages) {
			messages.push(...request.messages)
		}

		if (request.prompt) {
			messages.push({
				role: 'user',
				content: request.prompt,
			})
		}

		return await runChatCompletion(messages, {
			openAIApiKey: options.openAiApiKey || OPENAI_API_KEY,
		})
	}
}
