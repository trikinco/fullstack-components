import { runChatCompletion } from '../../chatGptService'
import { OPENAI_API_KEY } from '../../utils/constants'
import type { ChatMessage } from '../../types/ChatMessage'
import { ErrorEnhancementRequestBody, ErrorParserOptions } from './models'

export class ErrorClient {
	public handle = async (
		errorEnhancementRequest: ErrorEnhancementRequestBody,
		options?: ErrorParserOptions
	) => {
		console.log('handling error request', errorEnhancementRequest)
		const messages: ChatMessage[] = []
		messages.push(
			{
				role: 'system',
				content: `
                You are an expert software developer and communicator. You can translate computer errors, stack traces and other technical context and relay them to a customer of the software who is not technical at all. 
                1. Use straightforward language and avoid jargon.
                2. Do not use any technical terms that are not defined in the error message.
                3. Only return JSON in the format {title:string, message:string} where title is a short title for the error and message is a longer description of the error.
                
                # Instruction
                Please evaluate the following rubrics internally and then perform one of the actions below:
                
                ## Rubrics
                1. Categorise the problem: Recoverable or non-recoverable?
                2. Is this error a user caused error or a system bug?
                3. Could retrying the action that caused the issue solve the problem?
                
                ## Actions (choose one):
                1. [is recoverable]: If this is a recoverable error, suggest a solution to the user.
                2. [is non-recoverable]: If this is a non-recoverable error, suggest a workaround to the user.
                3. [is a user caused error]: If this is a user caused error, suggest retrying the action that caused the issue.
                4. [is a system bug]: If this is a system bug, please suggest contacting the software developer and provide a description of the error for the user to send to the developer.

                Please perform the action directly and do not include the reasoning. Remember, ONLY RETURN JSON.`,
			},
			{
				role: 'user',
				content: `Here is an error to analyse: ${JSON.stringify(
					errorEnhancementRequest
				)}.`,
			}
		)
		return await runChatCompletion(messages, {
			openAIApiKey: options?.openAiApiKey || OPENAI_API_KEY,
		})
	}
}