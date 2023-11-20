/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import OpenAI from 'openai'

export type ImageGenerationResponse = {
	responseText: string
	created: number
	data?: OpenAI.Image[]
	errorMessage?: string
}

export type ImageGenerationOptions = Omit<
	OpenAI.ImageGenerateParams,
	'model'
> & {
	openAIApiKey: string
	model?: OpenAI.ImageGenerateParams['model']
}

export async function runImageGeneration(
	prompt: string,
	options?: ImageGenerationOptions
): Promise<ImageGenerationResponse> {
	const { openAIApiKey, ...opts } = options || {}

	const openai = new OpenAI({
		apiKey: openAIApiKey,
	})

	console.log('Running image generation', prompt)

	try {
		const generation = await openai.images.generate({
			prompt,
			size: '256x256', // Default to small images to save $
			n: 1,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			response_format: 'url',
			...opts,
		})

		const extractedUrl = generation.data[0].url

		if (extractedUrl === undefined) {
			throw new Error('Could not extract URL from image generation')
		}

		console.log('Image generation response', extractedUrl)
		return {
			created: generation.created || 0,
			data: generation.data,
			responseText: extractedUrl || '',
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
