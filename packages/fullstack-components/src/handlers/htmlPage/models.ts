export interface HtmlPageRequestBody {
	/** Description of the HTML page you want to build or modify. */
	prompt?: string
	/** An absolute URL to a reference image to base the HTML page on. */
	src?: string
	/**
	 * A comma-separated list of unprefixed TailwindCSS colors to use.
	 * @example 'blue-400,red-600'
	 */
	colors?: string
	/** The theme to make the UI for, equivalent to media `prefers-color-scheme`. */
	theme?: 'light' | 'dark'
	/** A HTML page to modify or iterate on. */
	html?: string
}

export type HtmlPageResponse = string

export type HtmlPageOptions = {
	/**
	 * @default `process.env.OPENAI_API_KEY`.
	 */
	openAiApiKey?: string
}

export class HtmlPageError extends Error {
	public rootCause: string

	constructor(error: any) {
		super('Error running HtmlPage')
		this.name = 'HtmlPageError'
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.rootCause = error.message
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.stack = error.stack
	}
}
