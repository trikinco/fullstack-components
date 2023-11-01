import { runChatCompletion } from '../../chatGptService'
import { ChatMessage } from '../../types'
import { DetectPiiOptions, DetectPiiRequestBody } from './detectPiiHandlers'

export class DetectPiiClient {
	public handle = async (
		request: DetectPiiRequestBody,
		options: DetectPiiOptions
	) => {
		const messages: ChatMessage[] = []
		messages.push({
			role: 'user',
			content: `Here is a message that might contain personally identifiable information (PII): ${request.content}. You will analyize the provided message to detect any PII and return it in the format: {"piiFound": string[]}.
                
                1. Only return JSON in the format: {"piiFound": string[]} where "piiFound" is a list of any PII found in the message.
                2. Do not return any PII that is not in the message.`,
		})
		return await runChatCompletion(messages, {
			temperature: 0,
			openAIApiKey: options.openAiApiKey,
		})
	}
}
