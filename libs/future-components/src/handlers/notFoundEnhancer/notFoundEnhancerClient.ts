import { runChatCompletion } from '../../chatGptService'
import { OPENAI_API_KEY, URL_HOST } from '../../utils/constants'
import { NotFoundEnhancerRequestBody } from './notFoundEnhancer'
import { sitemapFromCache } from './sitemapParser'

export type ChatMessage = {
	role: 'system' | 'user' | 'assistant'
	content: string
}

export class NotFoundEnhancerClient {
	public handle = async (request: NotFoundEnhancerRequestBody) => {
		console.log('handling not found enhancer request', request)
		const possibleUrls = await sitemapFromCache(URL_HOST)
		const messages: ChatMessage[] = []
		messages.push(
			{
				role: 'system',
				content: `
                You are an expert website support specialist. 
                # You can 
                1. analyse a "not found" requested resource url and choose the most relevant suggested url for the customer from a provided list of valid urls. 
                2. Based on the resource/url that the user was trying to open, you can generate helpful message to replace the 404 page message. Example might be if the url has a query string ?query=super mario, you could generate a message like "We could not find any results for "super mario". Super mario is a famous video game character. Check out the wikipedia page."
                
                # Your response should:
                1. Use straightforward language and avoid jargon.
                2. Do not use any highly technical terms.
                3. Only return JSON in the format:
                
                {generatedContent:string, bestAlternateUrl:string} 
                
                where "generatedContent" is your attempt to create a useful instruction to help the user with their web page request and "bestAlternateUrl" is the most relevant URL from the provided list of valid urls.
                
                # Instruction
                Please evaluate the following rubrics internally and then perform the actions below:
                
                ## Rubrics
                1. Is there a relevant URL from the list of valid urls provided that could be what the user really wanted with their requested url? Examples might be a url containing "my account" could be redirected to "my profile" or a url containing "contact us" could be redirected to "support", also check for likely spelling mistakes - "2023/09/10/windows-wslsdfsdf2-automatic1111-stable-diffusion" could be "2023/09/10/windows-wsl2-automatic1111-stable-diffusion". 
                2. Do you understand the user's intent from the url?
                
                ## Actions (evaluate both):
                1. [has relevant alternate url]: Set "bestAlternateUrl" to the url. If no url is relevant, use the homepage or root url (/).
                2. [yes, you understand the user's intent]: Try generating 1 short paragraph that would be helpful to the user, maybe even solve their intent. If you cant generate anything helpful, set "generatedContent" to an empty string.

                Please perform the action directly and do not include the reasoning. Remember, ONLY RETURN JSON.`,
			},
			{
				role: 'user',
				content: `Here is the requested http resource: ${
					request.requestedUrl
				}. ${
					possibleUrls
						? `Here are all the possible valid url paths for this website: 
                        ${possibleUrls}`
						: ''
				}`,
			}
		)
		return await runChatCompletion(messages, {
			openAIApiKey: OPENAI_API_KEY,
		})
	}
}
