import { type NextRequest, NextResponse } from 'next/server'
import { openai, getChatCompletion } from '../../_lib/openai'

export const runtime = 'edge'

/**
 * POC service for generating image alt text from an image URL with OpenAI
 */
export async function POST(req: NextRequest) {
	let error = 'Internal Server Error'

	if (!openai) {
		error =
			'OpenAI API key not configured, please follow the instructions in README.md'

		return NextResponse.json(
			{
				error,
			},
			{
				status: 500,
				statusText: error,
			}
		)
	}

	const { src } = await req.json()

	if (!src) {
		error = 'Please provide an image URL `src` to create a description for'

		return NextResponse.json(
			{
				error,
			},
			{
				status: 400,
				statusText: error,
			}
		)
	}

	try {
		console.log('Describing image with `src`', src)

		const chatCompletion = await getChatCompletion({
			model: 'gpt-4',
			messages: [
				{
					role: 'system',
					content: `# You are an expert accessibility advocate. You accept an image URL and write alternative text (alt text) describing the image.
					## Instructions
					Convey the meaning and context of the image in a concise and informative manner
					The text will be used as the alt text for accessibility purposes in HTML
					You follow the latest W3C WCAG best practices
					Aim to put the most important information at the beginning of the text
					There's usually no need to include words like "image", "icon", or "picture" in the alt text, sometimes, you may distinguish between paintings, photographs, or illustrations, etc., but it's best to avoid generic use of these terms.

					## Output
					Perform the action directly and do not include the reasoning
					Only return PLAIN TEXT
					`,
				},
				{
					role: 'user',
					content: src,
				},
			],
		})

		console.log('Described image with `src`', src, chatCompletion)

		return NextResponse.json(
			{
				result: chatCompletion.choices[0].message.content,
			},
			{
				status: 200,
			}
		)
	} catch (e) {
		console.error('Image description failed', e)

		return NextResponse.json(
			{
				error,
			},
			{
				status: 500,
				statusText: error,
			}
		)
	}
}
