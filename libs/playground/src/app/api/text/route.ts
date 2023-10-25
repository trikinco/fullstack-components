import { type NextRequest, NextResponse } from 'next/server'
import { openai, getChatCompletion } from '../_lib/openai'

/**
 * POC service for generating rewritten text with OpenAI
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

	const {
		content,
		tone,
		strength,
		grade,
		max,
		min,
		count = 1,
	} = await req.json()

	if (!content) {
		error = 'Please provide content to rewrite'

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
		const rules = [
			tone ? `Your tone of voice to when rewriting the text is "${tone}".` : '',
			strength
				? `You rewrite the text to "${strength}" on a scale from 0-100. 0 returns the original text, 100 completely rewrites the text.`
				: '',
			grade
				? `Aim to make the text suitable for a ${grade} reading level.`
				: '',
			max && !min ? 'Make the full text shorter!' : '',
			max
				? `Limit the full text to ${max} characters or less! RETURN LESS THAN ${max} CHARACTERS TOTAL.`
				: '',
			min && !max ? 'Make the full text longer!' : '',
			min
				? `Increase the full text to ${min} characters or more! RETURN MORE THAN ${min} CHARACTERS TOTAL.`
				: '',
			count > 1
				? `Return an array of ${count} DIFFERENT versions of the text. Each item must be affected MORE than the last by the rules mentioned above.`
				: '',
		]
			.filter((x) => x)
			.join('\n')

		const chatCompletion = await getChatCompletion({
			messages: [
				{
					role: 'user',
					content: `
		            # Rewrite the following text.

		            ## Input
		            Text: ${content}

		            ## Rules
		            ${rules}

		            ## Output
                    - If the text has headings your response must include headings.
		            - Return the output as stringified HTML in JSON in an array. The array property name is 'content'.
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
