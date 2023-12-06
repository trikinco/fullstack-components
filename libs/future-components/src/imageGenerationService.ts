/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/naming-convention */
import OpenAI from 'openai'

export type ImageGenerationResponse<T = string | string[]> = {
	responseText: T
	created: number
	data?: OpenAI.Image[]
	errorMessage?: string
}

export type ImageGenerationOptions = Omit<
	OpenAI.ImageGenerateParams,
	'model' | 'prompt'
> & {
	openAIApiKey: string
	model?: OpenAI.ImageGenerateParams['model']
}

/**
 * Image generation service
 * Defaults to base64 data URIs
 */
export async function runImageGeneration(
	prompt: string,
	options?: ImageGenerationOptions
): Promise<ImageGenerationResponse> {
	const { openAIApiKey, response_format = 'b64_json', ...opts } = options || {}

	const openai = new OpenAI({
		apiKey: openAIApiKey,
	})

	console.log('Running image generation', prompt)

	try {
		const generation = await openai.images.generate({
			prompt,
			size: '256x256', // Default to small images to save $
			n: 1,
			response_format,
			...opts,
		})

		const generatedUrls: string[] = generation.data
			?.map((image) => {
				const data = image[response_format as 'url' | 'b64_json'] || ''

				if (response_format === 'b64_json') {
					return `data:image/png;base64,${data}`
				}

				return data
			})
			.filter(Boolean)

		const extractedUrls =
			generatedUrls?.length > 1 ? generatedUrls : generatedUrls[0]

		if (extractedUrls === undefined) {
			throw new Error('Could not extract URLs from image generation')
		}

		console.log('Image generation response', extractedUrls)
		return {
			created: generation.created || 0,
			data: generation.data,
			responseText: extractedUrls || '',
		}
	} catch (error) {
		// try not to throw from here. makes the path easier to follow in callers
		// the http library will throw on 400s from cat gpt but these are handlable errors
		const created = (error as any)?.created || 0
		const data = (error as any)?.data

		let errorMessage = (error as Error).message
		if (errorMessage.includes('400')) {
			errorMessage = `${errorMessage}: This usually means that we have exceeded the maximum number of tokens for the api. Or your api key is invalid.`
		}

		return {
			created,
			data,
			responseText: '',
			errorMessage,
		}
	}
}
