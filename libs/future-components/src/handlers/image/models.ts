export class ImageRequestBody {
	/** URL to image to describe */
	src?: string
	/** Prompt for image generation */
	prompt?: string
}

export type ImageResponse = string

export type ImageOptions = {
	openAiApiKey?: string
}

export class ImageError extends Error {
	public rootCause: string

	constructor(error: any) {
		super('Error running image')
		this.name = 'ImageError'
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.rootCause = error.message
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.stack = error.stack
	}
}
