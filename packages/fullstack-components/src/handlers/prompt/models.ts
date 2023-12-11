import type { ChatMessage } from '../../types/ChatMessage'

export interface PromptRequestBody {
	/**
	 * A text description of the desired output.
	 * Used to send a simple `user` message to chat completion.
	 */
	prompt?: string
	/**
	 * A list of chat completion messages comprising a conversation.
	 * `messages` are inserted before `prompt` if both are provided.
	 * @see `openai` for full `OpenAI.ChatCompletionMessageParam` type information.
	 */
	messages?: ChatMessage[]
}

export type PromptResponse = string

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
