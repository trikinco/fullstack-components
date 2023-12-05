import { runChatCompletion } from '../../chatGptService'
import { OPENAI_API_KEY } from '../../utils/constants'
import type { TextRequestBody, TextOptions } from './models'

const systemPrompt = `Rewrite, create, edit and modify text content for the web provided by the user.
You have full creative licence, unless otherwise specified by the user.
You accept HTML, markdown and plain text. 
The user will provide you with 'Rules' for how to modify the text. Only act on the content after 'Text:', DO NOT include the prompt or 'Rules'.

## Instructions
You ONLY RETURN JSON WITH THE FOLLOWING STRUCTURE {type:'text'|'markdown'|'HTML',content:string}
Return a single appropriate 'type' of 'text' | 'markdown' | 'HTML', either matching the input content type, or a 'type' defined by the user. This type MUST MATCH the actual kind of content you return. 
Return all the stringified content in the JSON 'content' property
If the user's HTML text has HTML heading elements (h1, h2, h3 etc.) and your rewritten text includes headings, ensure that they START AT THE SAME LEVEL as the input. e.g user prompt: 'make this text shorter', user HTML: '<h3 class="font-bold">long title</h3><p>long text..</p><p>more text</p>', return: '<h3 class="font-bold">title</h3><p>text..</p>'.
`

export async function getText(request: TextRequestBody, options?: TextOptions) {
	'use server'
	console.log('handling `getText` request', request)

	const {
		prompt = 'Rewrite the text',
		content,
		type,
		tone,
		strength,
		grade,
		max,
		min,
	} = request

	const rules = [
		type ? `All content returned must be of 'type': ${type}` : '',
		tone
			? `The style or tone of voice when rewriting the text is "${tone}".`
			: '',
		strength
			? `Your creative freedom strength is "${strength}" on a scale from 0-100. 0 is no creative freedom (return the original text, only correcting grammar), 100 is full creative freedom and imagination.`
			: '',
		grade ? `Make the text readable at a ${grade} reading level.` : '',
		max && !min ? 'Make the full text shorter!' : '',
		max
			? `Limit the full text to ${max} characters or less! YOU MUST RETURN LESS THAN ${max} CHARACTERS. THIS RULE HAS PRIORITY.`
			: '',
		min && !max ? 'Make the full text longer!' : '',
		min
			? `Increase the full text to ${min} characters or more! YOU MUST RETURN MORE THAN ${min} CHARACTERS. THIS RULE HAS PRIORITY.`
			: '',
	]
		.filter(Boolean)
		.join('\n')

	return await runChatCompletion(
		[
			{ role: 'system', content: systemPrompt },
			{
				role: 'user',
				content: `# ${prompt}
					Rules: 
					${rules}
					Text: 
					${content}
					`,
			},
		],
		{
			openAIApiKey: options?.openAiApiKey || OPENAI_API_KEY,
			format: 'JSON',
		}
	)
}

export class TextClient {
	public handle = async (request: TextRequestBody, options: TextOptions) => {
		console.log('handling `TextClient` request', request)

		return await getText(request, options)
	}
}
