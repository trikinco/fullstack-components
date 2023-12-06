import OpenAI from 'openai'

export type ImageGenerationOptions = Partial<OpenAI.ImageGenerateParams>

export interface ImageRequestBody extends ImageGenerationOptions {
	/** URL to image to describe */
	src?: string
}

export type ImageResponse<T> = T extends 1 | null | undefined
	? string
	: string[]

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
