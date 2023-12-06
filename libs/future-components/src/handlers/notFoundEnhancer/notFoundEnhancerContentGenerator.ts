import { runChatCompletion } from '../../chatGptService'
import { OPENAI_API_KEY } from '../../utils/constants'
import { sitemapFromCache } from './sitemapParser'
import type {
	NotFoundEnhancerOptions,
	NotFoundEnhancerRequestBody,
} from './models'

export type ChatMessage = {
	role: 'system' | 'user' | 'assistant'
	content: string
}

export async function getNotFoundContentGenerator(
	request: NotFoundEnhancerRequestBody,
	options: NotFoundEnhancerOptions
) {
	'use server'
	console.log('handling `getNotFoundContentGenerator` request', request)

	const possibleUrls = await sitemapFromCache(options.siteUrl)
	const messages: ChatMessage[] = []
	messages.push(
		{
			role: 'system',
			content: `
                You are an expert knowledge base for a website. Here is the full sitemap for the website: ${possibleUrls}
                # You can 
                1. analyse a user requested resource url that was 404 "not found" and you can generate a paragraph of content for the user that will solve their intent or problem. The content you create should replace the not found resource if possible.
                
                # Your response should:
                1. Use straightforward language and avoid jargon.
                2. Do not use any highly technical terms.
                3. Only return JSON in the format:
                
                {generatedContent:string} 
                
                where "generatedContent" is your attempt to create a useful instruction to help the user with their web page request and "bestAlternateUrl" is the most relevant URL from the provided list of valid urls.
                
                # Instruction
                Please evaluate the following rubrics internally and then perform the actions below:
                
                ## Rubrics
                1. Do you understand the user's intent from the url?
                
                ## Actions (evaluate both):
                1. [yes, you understand the user's intent]: Try generating 1 short paragraph that would be helpful to the user, maybe even solve their intent. If you cant generate anything helpful, set "generatedContent" to an empty string.

                Please perform the action directly and do not include the reasoning. Remember, ONLY RETURN JSON.`,
		},
		{
			role: 'user',
			content: `Here is the requested http resource: ${request.requestedUrl}. ${
				possibleUrls
					? `Here are all the possible valid url paths for this website: 
                        ${possibleUrls}`
					: ''
			}`,
		}
	)
	return await runChatCompletion(messages, {
		openAIApiKey: options.openAiApiKey || OPENAI_API_KEY,
	})
}

export class NotFoundEnhancerContentGenerator {
	public handle = async (
		request: NotFoundEnhancerRequestBody,
		options: NotFoundEnhancerOptions
	) => {
		console.log('handling `NotFoundEnhancerContentGenerator` request', request)

		return await getNotFoundContentGenerator(request, options)
	}
}
