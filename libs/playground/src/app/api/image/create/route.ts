import { type NextRequest, NextResponse } from 'next/server'
import { openai, getImageGeneration } from '../../_lib/openai'

/**
 * POC service for generating an image with OpenAI
 */
export async function POST(req: NextRequest) {
	let error = 'Internal Server Error'

	if (!openai.apiKey) {
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

	const { prompt } = await req.json()

	if (!prompt) {
		error = 'Please provide an image prompt'

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
		const imageGeneration = await getImageGeneration({
			prompt,
		})

		return NextResponse.json(
			{
				result: imageGeneration.data[0].url,
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
