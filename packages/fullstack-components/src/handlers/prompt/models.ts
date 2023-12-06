import type { ChatMessage } from '../../types/ChatMessage'

export class PromptRequestBody {
	/** Used to send a simple `user` message to chat completion */
	prompt?: string
	/** Messages to send to chat completion. `messages` are inserted before `prompt` if both are provided. */
	messages?: ChatMessage[]
}

export type PromptResponse = string

export type PromptOptions = {
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
