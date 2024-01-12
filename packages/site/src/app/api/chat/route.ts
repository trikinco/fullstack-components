import { type NextRequest, NextResponse } from 'next/server'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { openai, getChatCompletion } from '@/src/app/api/_lib/openai'

export const runtime = 'edge'

/**
 * POC service for a chat session with OpenAI
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

	const { messages } = await req.json()

	if (!messages) {
		error = 'Please provide the `messages`'

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
			stream: true,
			messages,
		})

		const stream = OpenAIStream(chatCompletion)
		return new StreamingTextResponse(stream)
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
