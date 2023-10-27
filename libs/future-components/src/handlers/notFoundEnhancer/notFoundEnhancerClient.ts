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
                You are an expert software developer and communicator. 
                # You can 
                1. analyse a "not found" resource requested in an http web application and choose the most relevant alternative url from a provided list. Examples might be a url containing "my account" could be redirected to "my profile" or a url containing "contact us" could be redirected to "support". 
                2. Based on the resource/url that the user was trying to open, you can generate helpful message to replace the 404 page. Example might be if the url has a query string ?query=super mario, you could generate a message like "We could not find any results for "super mario". Super mario is a video game character."
                
                # Your response should:
                1. Use straightforward language and avoid jargon.
                2. Do not use any highly technical terms.
                3. Only return JSON in the format:
                
                {generatedContent:string, bestAlternateUrl:string} 
                
                where generatedContent is your attempt to create and bestAlternateUrl is the best alternate URL to suggest to the user.
                
                # Instruction
                Please evaluate the following rubrics internally and then perform the actions below:
                
                ## Rubrics
                1. Is there an obvious alternate URL from the list of valid urls provided.
                2. Do you understand the user's intent from the url?
                
                ## Actions (choose one):
                1. [has obvious alternate url]: Set "bestAlternateUrl" to the url. If no url is particularly suitable, use the homepage/root url.
                2. [yes, you understand the user's intent]: Try generating 1 short paragraph that would be helpful to the user, maybe even solve their intent. If you cant generate anything helpful, set "generatedContent" to an empty string.

                Please perform the action directly and do not include the reasoning. Remember, ONLY RETURN JSON.`,
			},
			{
				role: 'user',
				content: `Here is the requested http resource: ${
					request.requestedUrl
				}. ${
					possibleUrls
						? `Here are all the valid urls for this website: 
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
