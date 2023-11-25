export class HtmlPageRequestBody {
	/** Description of the HTML page you want to build */
	prompt?: string
	/** An absolute URL to a reference image to base the HTML page on */
	src?: string
	/** A list of unprefixed TailwindCSS colors to use, e.g 'blue-400' */
	colors?: string
	/** Whether to make the UI light or dark theme, equivalent to media prefers-color-scheme */
	theme?: 'light' | 'dark'
}

export type HtmlPageResponse = string

export type HtmlPageOptions = {
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
