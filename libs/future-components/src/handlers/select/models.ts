export class SelectRequestBody {
	/**
	 * Prompt for creating the select
	 * @example 'All the GMT time zones'
	 * @example 'The nearest countries to Australia. Include a flag emoji in the label'
	 */
	prompt?: string
	/**
	 * What the purpose of the select is
	 * @example 'Selecting your time zone'
	 * @example 'Weekday selection'
	 */
	purpose?: string
	/**
	 * Additional context to pass to the prompt
	 * @example 'The time zone for Sydney should be selected'
	 * @example 'Sort the list based on what's most popular'
	 */
	context?: string
	/**
	 * The number of items to aim for
	 */
	count?: number
}

export type SelectRequestOptions = Omit<SelectRequestBody, 'prompt'> &
	Required<Pick<SelectRequestBody, 'prompt'>>

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
