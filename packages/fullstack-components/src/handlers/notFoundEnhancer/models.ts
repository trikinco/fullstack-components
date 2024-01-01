export interface NotFoundEnhancerRequestBody {
	/**
	 * The full URL being visited.
	 * @example 'https://example.com/this-page-does-not-exist'
	 */
	requestedUrl?: string
}

export interface NotFoundEnhancerResponse {
	/**
	 * A helpful message derived from inspecting the `requestedUrl` and sitemap.
	 * @example 'This page does not exist, if you are looking for the about page, you can find it at https://example.com/about'
	 */
	generatedContent: string
	/**
	 * A list of the most likely suitable URLs for the user to visit.
	 * @example `['https://example.com/about', 'https://example.com/contact']`
	 */
	bestAlternateUrls: string[]
}

export type NotFoundEnhancerOptions = {
	/**
	 * The application site URL. Used to find the sitemap, and to construct alternate URLs.
	 * @example 'https://example.com'
	 */
	siteUrl: string
	/**
	 * @default `process.env.OPENAI_API_KEY`.
	 */
	openAiApiKey: string
}

export class NotFoundEnhancerError extends Error {
	public rootCause: string

	constructor(error: any) {
		super('Error running 404 enhancer')
		this.name = 'NotFoundEnhancerError'
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.rootCause = error.message
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.stack = error.stack
	}
}
