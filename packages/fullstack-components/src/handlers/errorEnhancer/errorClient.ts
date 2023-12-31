import {
	type ChatGptCompletionResponse,
	runChatCompletion,
} from '../../chatGptService'
import { OPENAI_API_KEY } from '../../utils/constants'
import type { ChatMessage } from '../../types/ChatMessage'
import type { ErrorEnhancementRequestBody, ErrorParserOptions } from './models'

/**
 * Enhances the provided error with additional information.
 *
 * Server Action that calls the third-party API directly on the server. This avoids calling the Next.js API route handler allowing for performant Server Components.
 * @link https://nextjs.org/docs/app/building-your-application/data-fetching/patterns Next.js Data Fetching Patterns and Best Practices
 */
export async function getErrorEnhancement(
	/**
	 * @link ErrorEnhancementRequestBody
	 */
	request: ErrorEnhancementRequestBody,
	/**
	 * @link ErrorParserOptions
	 */
	options?: ErrorParserOptions
): Promise<ChatGptCompletionResponse> {
	'use server'
	console.log('handling `getErrorEnhancement` request', request)

	const getDevelopmentOutputMessages = (
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
				content: `Only return JSON in the format {"developmentModeContext":<preformatted string>}. Where "developmentModeContext" is a preformatted text string with your response. The response must be valid JSON, do not return string concatenations, only return valid JSON.
                
                You are building an application in NextJS framework and there is an error. 
                
                Identify the potential cause of the error and suggest a solution. 
                     
                example of preformatted valid JSON response: "{"developmentModeContext": "\n\nThe potential cause of the error is a forced 500 error, indicated by the errorMessage key in the provided JSON. This error is intentionally triggered and is likely used for testing purposes.\n\nTo handle this error, you can:\n1. Check if any specific logic or code is causing the forced 500 error and modify or remove it accordingly.\n2. Ensure that your application has proper error handling in place to gracefully handle any unexpected errors, such as utilizing try-catch blocks or implementing error middleware.\n3. Check the server logs or error logs for more detailed information about the error, which can help in identifying the root cause.\n\nRemember to thoroughly test your application after making any changes to ensure the error is resolved.\n\n"}"
                
                Here is an error to analyse: ${JSON.stringify(
									errorEnhancementRequest
								)}.`,
			},
		] as ChatMessage[]
	}

	const getSimpleOutputMessages = (
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

	const messages: ChatMessage[] = []

	if (options?.isProd !== true && process.env.NODE_ENV === 'development') {
		messages.push(...getDevelopmentOutputMessages(request))
	} else {
		messages.push(...getSimpleOutputMessages(request))
	}

	return await runChatCompletion(messages, {
		openAIApiKey: options?.openAiApiKey || OPENAI_API_KEY,
		format: 'JSON',
	})
}

export class ErrorClient {
	public handle = async (
		request: ErrorEnhancementRequestBody,
		options?: ErrorParserOptions
	) => {
		console.log('handling `ErrorClient` request', request)

		return await getErrorEnhancement(request, options)
	}
}
