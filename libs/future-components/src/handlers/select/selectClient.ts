import { runChatCompletion } from '../../chatGptService'
import { OPENAI_API_KEY } from '../../utils/constants'
import type { SelectRequestBody, SelectOptions } from './models'

const systemPrompt = `Generate a list of options to be used in a dropdown menu for the web.
The user may provide you with a 'purpose', 'context' and 'count' to help you create items for the dropdown. 
The 'context' may give you more information about how to generate or sort the dropdown items, which item should be selected, or other extra info. 

## Instructions
You ONLY RETURN JSON WITH THE FOLLOWING STRUCTURE {content:Array<{label:string,value:string,selected?:true}>,label:string}
Every 'value' in 'content' should be unique.
If the user indicates that an option should be selected add a 'selected' property with the value true for the given 'content' item.
Return a suitable 'label' for the dropdown menu in the property name 'label'.
Include as many options as needed to give the end user extensive choice. If the user defines a 'count', this has precedence. 
Make the dropdown options diverse and relevant for the given context
Do not include the reasoning
`

export class SelectClient {
	public handle = async (
		request: SelectRequestBody,
		options: SelectOptions
	) => {
		console.log('handling select request', request)

		let userMessage = `Create a list of dropdown menu options.\nPurpose: ${request?.prompt}`

		if (request?.context) {
			userMessage += `\nContext: ${request.context}`
		}
		if (request?.count) {
			userMessage += `\nCount: generate at least ${request?.count} options`
		}

		return await runChatCompletion(
			[
				{
					role: 'system',
					content: systemPrompt,
				},
				{
					role: 'user',
					content: userMessage,
				},
			],
			{
				openAIApiKey: options.openAiApiKey || OPENAI_API_KEY,
				format: 'JSON',
			}
		)
	}
}
