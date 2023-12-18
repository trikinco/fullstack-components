import OpenAI from 'openai'

export type ImageGenerationOptions = Partial<OpenAI.ImageGenerateParams>

/**
 * Image generation or description request body. See OpenAI.ImageGenerateParams for full type information.
 * @extends Partial<OpenAI.ImageGenerateParams>
 * @link https://www.npmjs.com/package/openai `openai` for full `OpenAI.ImageGenerateParams` type information.
 */
export interface ImageRequestBody extends ImageGenerationOptions {
	/**
	 * An absolute URL to the image to describe.
	 * @example 'https://absolute-cat-url/tabbycat.jpg'
	 */
	src?: string
}

export type ImageResponse<T> = T extends 1 | null | undefined
	? string
	: string[]

export type ImageOptions = {
	/**
	 * @default `process.env.OPENAI_API_KEY`.
	 */
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
