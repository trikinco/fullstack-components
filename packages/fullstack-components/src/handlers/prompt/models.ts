import type { ChatMessage } from '../../types/ChatMessage'

export interface PromptRequestBody {
	/**
	 * A text description of the desired output.
	 * Used to send a simple `user` message to chat completion.
	 * @example 'A blog post about the best way to cook a steak'
	 */
	prompt?: string
	/**
	 * A list of chat completion messages comprising a conversation.
	 * `messages` are inserted before `prompt` if both are provided.
	 * @example `[{ role: 'system', content: 'You are a professional chef and esteemed poet. You answer cooking questions with poetry and rhyme.' }, { role: 'user', content: 'What is the best way to cook a steak?'}]`
	 * @link https://www.npmjs.com/package/openai `openai` for full `OpenAI.ChatCompletionMessageParam` type information.
	 */
	messages?: ChatMessage[]
}

export type PromptResponseBody = string

export type PromptOptions = {
	/**
	 * @default `process.env.OPENAI_API_KEY`.
	 */
	openAiApiKey?: string
}

export class PromptError extends Error {
	public rootCause: string

	constructor(error: any) {
		super('Error running prompt')
		this.name = 'PromptError'
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.rootCause = error.message
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.stack = error.stack
	}
}
