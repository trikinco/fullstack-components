export type ErrorParserOptions = {
	appContext?: 'http web app' | 'mobile app' | 'desktop app'
	openAiApiKey?: string
	/** Overrides the output of `developmentModeContext` messages that are typically only shown when `process.env.NODE_ENV === 'development'` */
	isProd?: boolean
}
export class ErrorEnhancementRequestBody {
	/** The error message to analyze. This will usually be `error.message` */
	errorMessage?: string
	/** Additional context and information which may help with debugging */
	errorContext?: string
	/** The error stack trace to analyze. This will usually be `error.stack` */
	stackTrace?: string
}

export type ErrorEnhancementResponse = {
	message?: string
	title?: string
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
