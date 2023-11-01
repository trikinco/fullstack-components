export class NotFoundEnhancerRequestBody {
	requestedUrl?: string
}
export type NotFoundEnhancerResponse = {
	generatedContent: string
	bestAlternateUrls: string[]
}
export type NotFoundEnhancerOptions = {
	siteUrl: string
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
