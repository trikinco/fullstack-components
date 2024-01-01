export interface HtmlPageRequestBody {
	/**
	 * A text description of the HTML page you want to build or modify.
	 * @example 'A colorful about page for a cat named "Fluffy". Rounded corners, a gradient background, and a centered image of a cat.'
	 */
	prompt?: string
	/**
	 * An absolute URL to a reference image to base the design of the entire HTML page on.
	 * @example 'https://absolute-cat-inspiration/tabbycat-ui.jpg'
	 */
	src?: string
	/**
	 * A comma-separated list of unprefixed TailwindCSS colors to use in the generated HTML page.
	 * @example 'blue-400,red-600'
	 */
	colors?: string
	/**
	 * The theme to make the UI for, equivalent to media `prefers-color-scheme`.
	 * @example 'dark'
	 */
	theme?: 'light' | 'dark'
	/**
	 * A stringified HTML page to modify or iterate on. Useful when allowing for follow-up calls to modify a previously generated HTML page.
	 * @example '<html><body><h1>Henlo, world!</h1></body></html>'
	 */
	html?: string
}

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
