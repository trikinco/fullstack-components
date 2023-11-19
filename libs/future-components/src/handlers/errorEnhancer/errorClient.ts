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
		if (process.env.NODE_ENV === 'development') {
			messages.push(
				...this.getDevelopmentOutputMessages(errorEnhancementRequest)
			)
		} else {
			messages.push(...this.getSimpleOutputMessages(errorEnhancementRequest))
		}
		return await runChatCompletion(messages, {
			openAIApiKey: options?.openAiApiKey || OPENAI_API_KEY,
		})
	}

	private getDevelopmentOutputMessages = (
		errorEnhancementRequest: ErrorEnhancementRequestBody
	) => {
		return [
			{
				role: 'system',
				content: `
                You are an expert software developer and debugger.`,
			},
			{
				role: 'user',
				content: `Only return JSON in the format {"developmentModeContext":<markdown string>}. Where "developmentModeContext" is a markdown string with your response
                
                You are building an application in NextJS framework and there is an error. 
                
                Identify the potential cause of the error and suggest a solution. 
                        
                Here is an error to analyse: ${JSON.stringify(
									errorEnhancementRequest
								)}.`,
			},
		] as ChatMessage[]
	}

	private getSimpleOutputMessages = (
		errorEnhancementRequest: ErrorEnhancementRequestBody
	) => {
		return [
			{
				role: 'system',
				content: `
                You are an expert software developer and communicator. You can translate computer errors, stack traces and other technical context and relay them to a customer of the software who is not technical at all. 
                1. Use straightforward language and avoid jargon.
                2. Do not use any technical terms that are not defined in the error message.
                3. Only return JSON in the format {title:string, message:string} where title is a short title for the error and message is a longer description of the error.
                
                # Instruction
                Evaluate the following rubrics internally and then perform one of the actions below:
                
                ## Rubrics
                1. Categorise the problem: Recoverable or non-recoverable?
                2. Is this error a user caused error or a system bug?
                3. Could retrying the action that caused the issue solve the problem?
                
                ## Actions (choose one):
                1. [is recoverable]: If this is a recoverable error, suggest a solution to the user.
                2. [is non-recoverable]: If this is a non-recoverable error, suggest a workaround to the user.
                3. [is a user caused error]: If this is a user caused error, suggest retrying the action that caused the issue.
                4. [is a system bug]: If this is a system bug, suggest contacting the software developer.

                Perform the action directly and do not include the reasoning. Remember, ONLY RETURN JSON.`,
			},
			{
				role: 'user',
				content: `Only return JSON in the format {"title":string, "message":string}. Here is an error to analyse: ${JSON.stringify(
					errorEnhancementRequest
				)}.`,
			},
		] as ChatMessage[]
	}
}
