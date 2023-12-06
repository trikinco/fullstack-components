import { runChatCompletion } from '../../chatGptService'
import { OPENAI_API_KEY } from '../../utils/constants'
import type { ChatMessage } from '../../types/ChatMessage'
import type { SelectRequestBody, SelectOptions } from './models'

const systemPrompt = `Generate a list of options to be used in a dropdown menu for the web.
The user will provide you with instructions, and possibly a 'purpose', 'context' and 'count' to help you create items for the dropdown. 
The 'context' may give you more information about how to generate or sort the dropdown items, which item should be selected, or other extra info. 

## Instructions
You ONLY RETURN JSON WITH THE FOLLOWING STRUCTURE {content:Array<{label:string,value:string,selected?:true}>,label:string}
Every 'value' in 'content' should be unique.
If the user indicates that an option should be selected add a 'selected' property with the value true for the given 'content' item.
Return a suitable 'label' for the dropdown menu in the property name 'label'. The text in 'label' is the visible label that people will see in the dropdown, so make them readable.
Include as many options as needed to give the end user extensive choice. If the user defines a 'count', this has precedence. 
Make the dropdown options diverse and relevant for the given context
Do not include the reasoning
`

export async function getSelect(
	request: SelectRequestBody,
	options?: SelectOptions
) {
	'use server'
	console.log('handling `getSelect` request', request)
	const content: ChatMessage['content'] = []

	if (request.prompt) {
		content.push({
			type: 'text',
			text: `Create a list of dropdown menu options based on these instructions: ${request.prompt}`,
		})
	}

	if (request.purpose) {
		content.push({
			type: 'text',
			text: `Purpose: ${request.purpose}`,
		})
	}

	if (request.context) {
		content.push({
			type: 'text',
			text: `Context: ${request.context}`,
		})
	}

	if (request.count) {
		content.push({
			type: 'text',
			text: `Count: generate at least ${request?.count} options`,
		})
	}

	return await runChatCompletion(
		[
			{
				role: 'system',
				content: systemPrompt,
			},
			{
				role: 'user',
				content,
			},
		],
		{
			openAIApiKey: options?.openAiApiKey || OPENAI_API_KEY,
			format: 'JSON',
		}
	)
}

export class SelectClient {
	public handle = async (
		request: SelectRequestBody,
		options: SelectOptions
	) => {
		console.log('handling `SelectClient` request', request)

		return await getSelect(request, options)
	}
}
