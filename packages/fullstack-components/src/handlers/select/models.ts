export interface SelectRequestBody {
	/**
	 * A text description for creating the dropdown.
	 * @example 'All the GMT time zones'
	 */
	prompt?: string
	/**
	 * A text description of the purpose of the dropdown.
	 * @example 'Selecting your time zone'
	 */
	purpose?: string
	/**
	 * A text description of additional context or information to help create the dropdown.
	 * @example 'The time zone for Sydney should be selected'
	 */
	context?: string
	/**
	 * The number of dropdown options or list items to create.
	 * @example 10
	 */
	count?: number
}

export type SelectResponseItem = {
	/**
	 * Text to display in the dropdown option.
	 * @example 'GMT+10:00 Brisbane, Melbourne, Sydney'
	 */
	label: string
	/**
	 * Text value to return when the option is selected.
	 * @example 'Australia/Sydney'
	 */
	value: string
	/**
	 * Whether the option is selected by default.
	 * @example true
	 */
	selected?: true
}

export type SelectResponse = {
	/**
	 * An array of options to list or display in a dropdown.
	 * @example [{ label: 'GMT+10:00 Brisbane, Melbourne, Sydney', value: 'Australia/Sydney', selected: true }, { label: 'GMT+12:00 Auckland, Wellington', value: 'Pacific/Auckland' }, ...]
	 */
	content: Array<SelectResponseItem>
	/**
	 * The overall associated label for the dropdown.
	 * @example 'Select Time Zone (GMT)'
	 */
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
