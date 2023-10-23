import { runChatCompletion } from './chatGptService'

export type ChatMessage = {
	role: 'system' | 'user' | 'assistant'
	content: string
}
export class ErrorClient {
	public handleErrorRequest = async (
		errorString: string,
		additionalAppContext?: string
	) => {
		const openAiKey = process.env.OPENAI_API_KEY || 'sk-1234'
		const messages: ChatMessage[] = []
		messages.push(
			{
				role: 'system',
				content: `
                You are an expert software developer and communicator. You can translate computer errors, stack traces and other technical context and relay them to a customer of the software who is not technical at all. 
                1. Use straightforward language and avoid jargon.
                2. Do not use any technical terms that are not defined in the error message.
                
                # Instruction
                Please evaluate the following rubrics internally and then perform one of the actions below:
                
                ## Rubrics
                1. Is this an error?
                2. Is this error a user caused error or a system bug?
                3. Could retrying the action that caused the issue solve the problem?
                
                ## Actions (choose one):
                1. [is not an error]: If this is not an error please respond with "This does not look like an error" and explain to the user why, briefly.
                2. [is a user caused error]: If this is a user caused error, suggest retrying the action that caused the issue.
                3. [is a system bug]: If this is a system bug, please suggest contacting the software developer and provide a description of the error for the user to send to the developer.

                Please perform the action directly and do not include the reasoning.`,
			},
			{
				role: 'user',
				content: `Here is an error to analyse: ${errorString}`,
			}
		)
		const openAiResponse = await runChatCompletion(messages, {
			openAIApiKey: openAiKey,
		})

		return openAiResponse
	}
}
