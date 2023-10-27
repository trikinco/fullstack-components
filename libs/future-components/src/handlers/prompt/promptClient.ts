import { runChatCompletion } from '../../chatGptService'
import { OPENAI_API_KEY } from '../../utils/constants'
import { PromptRequestBody } from './promptHandler'

export class PromptClient {
	public handle = async (request: PromptRequestBody) => {
		console.log('handling prompt request', request)

		return await runChatCompletion(
			[
				{
					role: 'user',
					content: request.prompt || '',
				},
			],
			{
				openAIApiKey: OPENAI_API_KEY,
			}
		)
	}
}
