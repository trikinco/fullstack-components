import { type NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || '',
})

/**
 * Get a prompt for generating a user-friendly error message
 *
 * @see https://wix-ux.com/when-life-gives-you-lemons-write-better-error-messages-46c5223e1a2f
 * @see https://www.linkedin.com/pulse/designing-better-error-messages-ux-vitaly-friedman/
 * @see https://www.nngroup.com/articles/error-message-guidelines/
 */
function generateErrorMessagePrompt(message: string, stack: string) {
	return `Suggest a concise and user-friendly error message based on the following details.

    Error message: ${message}
    Error stack trace: ${stack}

    Format the user-friendly error message based on these best practices:
    - Title: Say what happened.
    - Body (not bullet points): If possible provide reassurance by letting the user know what was not affected by the error, say why the error happened, help them fix it, give them a way out.

	Avoid: Whoops!, Oops!, Resource loading error, Something went wrong, try again later, the requested resource, sorry for the inconvenience, technical jargon, generic response.

	Simplify the error message to be readable at an 8th-grade level.

	Return the response as JSON using the property names "title" and "message".
    `
}

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

	const { message, stack } = await req.json()

	if (!message || !stack) {
		error = 'Please provide an error message'

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
		const chatCompletion = await openai.chat.completions.create({
			messages: [
				{ role: 'user', content: generateErrorMessagePrompt(message, stack) },
			],
			model: 'gpt-3.5-turbo',
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
