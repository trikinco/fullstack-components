export type ErrorParserOptions = {
	/**
	 * The context of the running app to analyze errors for.
	 * Helps provide the most relevant type of information.
	 */
	appContext?: 'http web app' | 'mobile app' | 'desktop app'
	/**
	 * @default `process.env.OPENAI_API_KEY`.
	 */
	openAiApiKey?: string
	/**
	 * Overrides the output of `developmentModeContext` messages that are typically only shown when `process.env.NODE_ENV === 'development'`
	 */
	isProd?: boolean
}

export interface ErrorEnhancementRequestBody {
	/** The error message to analyze. This will usually be `error.message` from an `Error` object. */
	errorMessage?: string
	/** Additional context and information which may help with debugging. */
	errorContext?: string
	/** The error stack trace to analyze. This will usually be `error.stack` from an `Error` object. */
	stackTrace?: string
}

export type ErrorEnhancementResponse = {
	/**
	 * A helpful text message explaining the error to a non-technical user.
	 */
	message?: string
	/**
	 * A text title related to the `message` explanation.
	 */
	title?: string
	/**
	 * A helpful text message explaining the potential cause of the error and a possible solution.
	 * The message is intended for developers.
	 * Only shown if `process.env.NODE_ENV === 'development'` and `isProd === false`
	 */
	developmentModeContext?: string
}

export class ErrorEnhancementError extends Error {
	public rootCause: string

	constructor(error: any) {
		super('Error parsing your error text and context with ML')
		this.name = 'ErrorParserError'
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.rootCause = error.message
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.stack = error.stack
	}
}
