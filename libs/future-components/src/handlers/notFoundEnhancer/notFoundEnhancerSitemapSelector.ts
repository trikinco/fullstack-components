import { runChatCompletion } from '../../chatGptService'
import { OPENAI_API_KEY } from '../../utils/constants'
import { NotFoundEnhancerOptions, NotFoundEnhancerRequestBody } from './models'
import { sitemapFromCache } from './sitemapParser'

export type ChatMessage = {
	role: 'system' | 'user' | 'assistant'
	content: string
}

export class NotFoundEnhancerSitemapSelector {
	public handle = async (
		request: NotFoundEnhancerRequestBody,
		options: NotFoundEnhancerOptions
	) => {
		console.log('handling not found sitemap selector request', request)
		const possibleUrls = await sitemapFromCache(options.siteUrl)
		const messages: ChatMessage[] = []
		messages.push(
			{
				role: 'system',
				content: `
                You are an expert knowledge base for a website. Here is the full sitemap for the website: ${possibleUrls}
                # You can 
                1. analyse a user requested resource url that was 404 "not found" and choose the most relevant urls from the provided sitemap for the user. 
      
                # Your response should:
                1. Only use use urls from the sitemap, don't invent urls.
                2. Urls might be relevant if 
                     1. they are related concepts. 
                     2. They are synonyms e.g. "my account" could be redirected to "my profile" or a url containing "contact us" could be redirected to "support"
                     3. There is a close match in the sitemap list e.g. "2023/09/10/windows-wslsdfsdf2-automatic1111-stable-diffusion" could be "2023/09/10/windows-wsl2-automatic1111-stable-diffusion"
                     4. There is a spelling mistake
                     5. Or any reason you think makes them relevant, be inventive.
                3. Return a maximum of 5 urls, order them by your confidence that they are relevant to the user's intent.
                4. Do not invent urls. Only use URLS that exist in the provided sitemap list, this is very important.
                5. Only return JSON in the format:
                
                {"bestAlternateUrls": string[]} 
                
                where "bestAlternateUrl" is the most relevant URLs from the provided sitemap list of urls.
                
                # Instruction
                Please evaluate the following rubrics internally and then perform the actions below:
                
                ## Rubrics
                1. Are there any relevant URLs from the sitemap list of urls provided that could be what the user really wanted with their requested url?  
             
                ## Actions (evaluate both):
                1. [has relevant alternate url(s)]: Set "bestAlternateUrls" to the urls. If no url is relevant, add the homepage or root url (/).

                Please perform the action directly and do not include the reasoning. Remember, ONLY RETURN JSON.`,
			},
			{
				role: 'user',
				content: `Here is the 404 "not found" requested http resource: ${request.requestedUrl}. Find any bestAlternateUrls.`,
			}
		)
		return await runChatCompletion(messages, {
			openAIApiKey: options.openAiApiKey || OPENAI_API_KEY,
			temperature: 0,
		})
	}
}
