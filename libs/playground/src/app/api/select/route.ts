import { type NextRequest, NextResponse } from 'next/server'
import { openai, getChatCompletion } from '../_lib/openai'

export const runtime = 'edge'

/**
 * POC service for generating select options with OpenAI
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

	const { context, purpose, count } = await req.json()

	if (!purpose) {
		error = 'Please provide the purpose of the select'

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
			messages: [
				{
					role: 'user',
					content: `
		            ## Instructions
					- Generate a list of options for a dropdown menu for ${purpose}. 
					- ${
						count
							? `Include at least ${count} options`
							: 'Include as many options as needed'
					}. 
					- Make the options diverse and relevant for the given context.

					## Context
		            Additional context: ${context}

		            ## Output
		            - Return the output as objects in a JSON array in the property name 'content'. Each object must have a 'label' and 'value', all values must be unique. If the user has indicated that an option should be selected add a 'selected' property with the value true.
					- Return a suitable label for the dropdown menu in the JSON in the property name 'label'.
		            - Do not include the reasoning
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
