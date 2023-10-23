import { type NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || '',
})

/**
 * Get a prompt for generating a user-friendly error message
 *
 * Error message research:
 * @see {@link https://wix-ux.com/when-life-gives-you-lemons-write-better-error-messages-46c5223e1a2f Error message copywrighting}
 * @see {@link https://www.nngroup.com/articles/error-message-guidelines/ Error message guidelines}
 * @see {@link https://www.linkedin.com/pulse/designing-better-error-messages-ux-vitaly-friedman/ Error message UX/UI}
 */
function getUserPrompt(message: string, stack: string) {
	return `
	# Suggest a concise and user-friendly error message based on the following details.

	## Input
    Error message: ${message}
    Error stack trace: ${stack}

    ## Desired output
    Title (approx. 40-60 characters): Say what happened in simple and friendly terms, if possible use subject-verb-object, include keywords, if possible ensure the title can be understood out of context.
    Message (approx. 80-300 characters, not bullet points): First, if possible provide reassurance by letting the user know what was not affected by the error, don't start with 'Sorry', say why the error happened, help them fix it, give them a way out.

	### Output formatting conditions
	Tone: Friendly, helpful, reassuring, positive, humble, empathetic without being overly apologetic.
	Inappropriate language: 'Whoops!', 'Oops!', 'Error:', 'We're sorry', 'Internal server error', 'Unknown error', 'Something went wrong', 'the requested resource', 'We apologize', '[apologize|sorry] for [the|any] inconvenience', '[appreciate|thank you for] your understanding', starting with sorry, technical jargon, generic language, negative tone.
	Appropriate language examples: Unable to*, Failed to*, Can't*, positive tone.
	Text refinement: Simplify title and message to be readable at an 8th-grade level.
	
	## Output
	Return the response directly as JSON using the property names "title" and "message".
    `
}

/**
 * POC service for generating nicely formatted error messages with OpenAI
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
			messages: [{ role: 'user', content: getUserPrompt(message, stack) }],
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
