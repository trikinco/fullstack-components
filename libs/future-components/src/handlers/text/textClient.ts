import { runChatCompletion } from '../../chatGptService'
import { OPENAI_API_KEY } from '../../utils/constants'
import type { TextRequestBody, TextOptions } from './models'

const systemPrompt = `Rewrite and modify text content for the web provided by the user. 
You accept HTML, markdown and plain text. 
The user will provide you with 'Rules' for how to modify the text.

## Instructions
You ONLY RETURN JSON WITH THE FOLLOWING STRUCTURE {content:Array<{type:'text'|'markdown'|'HTML',value:string}>}
Each item in the 'content' array is a separate paragraph/title/text
If you receive plain text, markdown or HTML, return the stringified content in the JSON 'content' array 'value' with the appropriate 'type': 'text' | 'markdown' | 'HTML'
If the user's HTML text has HTML heading elements (h1, h2, h3 etc.) and your rewritten text includes headings, ensure that they START AT THE SAME LEVEL as the input. e.g user prompt: 'make this text shorter', user HTML: '<h3 class="font-bold">long title</h3><p>long text..</p><p>more text</p>', return: '<h3 class="font-bold">title</h3><p>text..</p>'.
`

export class TextClient {
	public handle = async (request: TextRequestBody, options: TextOptions) => {
		console.log('handling text request', request)

		const {
			prompt = 'Rewrite this text',
			content,
			tone,
			strength,
			grade,
			max,
			min,
		} = request

		const rules = [
			tone ? `Your tone of voice when rewriting the text is "${tone}".` : '',
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
		]
			.filter(Boolean)
			.join('\n')

		return await runChatCompletion(
			[
				{ role: 'system', content: systemPrompt },
				{
					role: 'user',
					content: `# ${prompt}\nText: ${content}\n## Rules\n${rules}`,
				},
			],
			{
				openAIApiKey: options.openAiApiKey || OPENAI_API_KEY,
				format: 'JSON',
			}
		)
	}
}
