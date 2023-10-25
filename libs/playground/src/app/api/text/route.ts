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
		console.log('get chat completion with', {
			content,
			tone,
			strength,
			grade,
			max,
			min,
			count,
		})

		const chatCompletion = await getChatCompletion({
			messages: [
				{
					role: 'system',
					content: `
                    # You are an author, copywriter, editor and master communicator. 
                    1. You can explain complex topics in simple terms understandable by anyone. 
                    2. You edit, shorten, simplify and rewrite text provided by the user.
                    
                    ## Instructions
                    - Rewrite the input 'Text'
                    - Where possible, keep the original HTML elements in the output. The original HTML attributes must always be preserved if the HTML is kept.
                    - Strictly follow all rules and instructions provided by the user
                    - Never return more text than what is asked for

                    ## Output model
                    {
                        content: string[]
                    }
                    
                    ### Output model description
                    - "content": Each paragraph or each HTML element of the rewritten 'Text'.
                    
                    ### Input text example
                    '<h3 class="text-xl">This is a long title</h3><p>This is a long paragraph.</p><p>This is a longer paragraph.</p>'

                    ### Output text example
                    {
                        content: [
                            "<h3 class=\"text-xl\">This is a title<\/h3>",
                            "<p>This is a paragraph.</p>",
                        ]
                    }

                    ## Rewriting and formatting
                    1. Rewrite the text and strictly follow all instructions and rules given by the user. Remove or add HTML elements as needed to shorten or lengthen the text. Escape and stringify any HTML.
                    2. Split each paragraph or HTML element of the rewritten text into items in the returned 'content' array.

                    ## Validation steps - do these internally
                    1. Join all items in 'content' into a single string, remove all HTML from the joined string and check the length of the string.
                    3. If the length of the string does not meet the minimum character count defined by the user, return to 'Rewriting and formatting' and increase the length of the text.
                    4. If the length of the string exceeds the max character count defined by the user, return to 'Rewriting and formatting' and shorten the text.
                    5. If the joined string fail any instructions provided by the user, go back to 'Rewriting and formatting' and make more changes as needed. Otherwise, continue.
                    
                    ## Output
                    Return the output as JSON. Do not include the reasoning.
                    `,
				},
				{
					role: 'user',
					/**
					 * Generate a user-friendly error message
					 *
					 * Error message research:
					 * @see {@link https://wix-ux.com/when-life-gives-you-lemons-write-better-error-messages-46c5223e1a2f Error message copywrighting}
					 * @see {@link https://www.nngroup.com/articles/error-message-guidelines/ Error message guidelines}
					 * @see {@link https://www.linkedin.com/pulse/designing-better-error-messages-ux-vitaly-friedman/ Error message UX/UI}
					 */
					content: `
                    # Rewrite the Input 'Text' while strictly following the 'Rules' provided.

                    ## Input
                    Text: ${content}

                    ## Rules
                    ${
											tone
												? `Your tone of voice to consider when rewriting the entire text is "${tone}".\n`
												: ''
										}${
											strength
												? `You rewrite the entire text to "${strength}" on a scale from 0-100. 0 returns the original text, 100 fully rewrites the text.\n`
												: ''
										}${
											grade
												? `You rewrite, simplify and shorten the entire text to be at a ${grade} reading level.\n`
												: ''
										}${
											max
												? `Do not return more than ${max} characters in total.\n`
												: ''
										}${
											min
												? `Do not return less than ${min} characters in total.\n`
												: ''
										}

                    ## Remember
                    - Follow all rules strictly at all times for the entire text provided.
                    - The max length has top priority and must never be exceeded.
                    `,
				},
			],
		})

		console.log('got a chatCompletion response', {
			message: chatCompletion.choices[0].message.content,
			chatCompletion,
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
