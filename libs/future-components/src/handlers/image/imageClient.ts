import { runChatCompletion } from '../../chatGptService'
import { runImageGeneration } from '../../imageGenerationService'
import { OPENAI_API_KEY } from '../../utils/constants'
import type { ImageRequestBody, ImageOptions } from './models'

const systemPrompt = `# You are an expert accessibility advocate. You accept an image URL and write alternative text (alt text) describing the image.
## Instructions
Convey the meaning and context of the image in a concise and informative manner
The text will be used as the alt text for accessibility purposes in HTML
You follow the latest W3C WCAG best practices
Aim to put the most important information at the beginning of the text
There's usually no need to include words like "image", "icon", or "picture" in the alt text, sometimes, you may distinguish between paintings, photographs, or illustrations, etc., but it's best to avoid generic use of these terms.

## Output
Perform the action directly and do not include the reasoning
Only return PLAIN TEXT
`

export async function getImage(
	request: ImageRequestBody,
	options?: ImageOptions
) {
	'use server'
	console.log('handling `getImage` request', request)

	const { src = '', prompt, ...rest } = request
	const openAIApiKey = options?.openAiApiKey || OPENAI_API_KEY

	// Generate images
	if (prompt) {
		console.log('handling `getImage`, image generation')
		return await runImageGeneration(prompt, { ...rest, openAIApiKey })
	}

	console.log('handling `getImage`, image description')
	// Describe images
	return await runChatCompletion(
		[
			{
				role: 'system',
				content: systemPrompt,
			},
			{
				role: 'user',
				content: [
					{
						type: 'image_url',
						// eslint-disable-next-line @typescript-eslint/naming-convention
						image_url: {
							url: src,
						},
					},
				],
			},
		],
		{
			openAIApiKey,
			model: 'gpt-4-vision-preview',
		}
	)
}

export class ImageClient {
	public handle = async (request: ImageRequestBody, options: ImageOptions) => {
		console.log('handling `ImageClient` request', request)

		return await getImage(request, options)
	}
}
