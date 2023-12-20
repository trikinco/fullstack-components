import { runChatCompletion } from '../../chatGptService'
import { OPENAI_API_KEY } from '../../utils/constants'
import type { PromptRequestBody, PromptOptions } from './models'
import type { ChatMessage } from '../../types/ChatMessage'

/**
 * Answers a `prompt` or an array of `messages` and returns the response as-is.
 *
 * Prompt Server Action that calls the third-party API directly on the server. This avoids calling the Next.js API route handler allowing for performant Server Components.
 * @link https://nextjs.org/docs/app/building-your-application/data-fetching/patterns Next.js Data Fetching Patterns and Best Practices
 * @returns {Promise<ChatGptCompletionResponse<string>>} response
 */
export async function getPrompt(
	/**
	 * @link PromptRequestBody
	 */
	request: PromptRequestBody,
	/**
	 * @link PromptOptions
	 */
	options?: PromptOptions
) {
	'use server'
	console.log('handling `getPrompt` request', request)
	const messages: ChatMessage[] = []

	if (request.format === 'JSON') {
		messages.push({
			role: 'system',
			content: 'Return JSON',
		})
	}

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
		openAIApiKey: options?.openAiApiKey || OPENAI_API_KEY,
		format: request.format,
	})
}

export class PromptClient {
	public handle = async (
		request: PromptRequestBody,
		options: PromptOptions
	) => {
		console.log('handling `PromptClient` request', request)

		return await getPrompt(request, options)
	}
}
