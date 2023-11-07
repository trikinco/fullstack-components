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

	const { imageURL } = await req.json()

	if (!imageURL) {
		error = 'Please provide an image URL'

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
		const chatCompletion = await getChatCompletion({
			model: 'gpt-4',
			messages: [
				{
					role: 'user',
					content: `					
					# Instructions
					Provide a concise and informative description this image: ${imageURL}
					This description will be used as the alt text for accessibility purposes in HTML.

					## Output
					Perform the action directly and do not include the reasoning.
					`,
				},
			],
		})

		return NextResponse.json(
			{
				result: chatCompletion.choices[0].message.content,
			},
			{
				status: 200,
			}
		)
	} catch (e) {
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
