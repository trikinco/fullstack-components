export interface SelectRequestBody {
	/**
	 * A text description for creating the dropdown.
	 * @example 'All the GMT time zones'
	 * @example 'The nearest countries to Australia. Include a flag emoji in the label'
	 */
	prompt?: string
	/**
	 * A text description of the purpose of the dropdown.
	 * @example 'Selecting your time zone'
	 * @example 'Weekday selection'
	 */
	purpose?: string
	/**
	 * A text description of additional context or information to help create the dropdown.
	 * @example 'The time zone for Sydney should be selected'
	 * @example 'Sort the list based on what's most popular'
	 */
	context?: string
	/**
	 * The number of dropdown options or list items to create.
	 */
	count?: number
}

export type SelectRequestOptions = Omit<SelectRequestBody, 'prompt'> &
	Required<Pick<SelectRequestBody, 'prompt'>>

export type SelectResponseItem = {
	/**
	 * Readable label for the option
	 */
	label: string
	/**
	 * Value for the option
	 */
	value: string
	/**
	 * Whether the option is selected
	 */
	selected?: true
}

export type SelectResponse = {
	/**
	 * An array of options to display in the dropdown
	 */
	content: Array<SelectResponseItem>
	/** The overall associated label for the dropdown */
	label: string
}

export type SelectOptions = {
	/**
	 * @default `process.env.OPENAI_API_KEY`.
	 */
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
