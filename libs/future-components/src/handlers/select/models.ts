export class SelectRequestBody {
	/**
	 * Additional context to pass to the prompt. Free text
	 */
	context?: string
	/**
	 * @example 'selecting your time zone'
	 * @example 'weekday selection'
	 */
	prompt?: string
	/**
	 * The number of items to aim for
	 */
	count?: number
}

export type SelectResponseItem = {
	label: string
	value: string
	selected?: true
}

export type SelectResponse = {
	content: Array<SelectResponseItem>
	label: string
}

export type SelectOptions = {
	openAiApiKey?: string
}

export class SelectError extends Error {
	public rootCause: string

	constructor(error: any) {
		super('Error running select')
		this.name = 'SelectError'
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.rootCause = error.message
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.stack = error.stack
	}
}
