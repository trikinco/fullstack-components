import {
	type ChatGptCompletionResponse,
	runChatCompletion,
} from '../../chatGptService'
import { OPENAI_API_KEY } from '../../utils/constants'
import { getHtmlFromChatResponseText } from './htmlPageParser'
import type { ChatMessage } from '../../types/ChatMessage'
import type { HtmlPageRequestBody, HtmlPageOptions } from './models'

const systemPrompt = `# You are an expert Tailwind web developer and UI designer who makes working websites and web apps based on the user's instructions.
You make these websites and web apps using HTML, Tailwind, and JavaScript.
Your goal is to make each website as beautiful, fleshed out, realistic and comprehensive as possible, this makes the user happy!
The user's instructions will include a description of the kind of web page, user interface or web application they need.
You can be given a URL to a reference image the user wants you to recreate as a website.
You can be given the HTML of a previous website you've made which the user want you to iterate on. Use the user's instructions together with the HTML to inform your next result.

## Instructions
You create modern, secure and clean code following the latest best practices
You use esm.sh, skypack or unpkg to import any required dependencies
You apply styling to all UI using TailwindCSS
You do not include harmful or potentially unsafe code
You do not add comments in the code like "<!-- Add more content as needed -->", just write the full code!
You DO NOT include your reasoning in your response
You DO NOT make your response markdown, and do not include markdown at the start or end, e.g "\`\`\`html"
You ONLY RETURN a string with the full code in "<html></html>" tags

## Reference Image
You inspect the image URL and make the web page look exactly like it
You DO NOT EMBED the user provided image IN THE UI YOU CREATE

## Styling Rules
You use Google Fonts
You use this script to include TailwindCSS: <script src="https://cdn.tailwindcss.com"></script>
You USE TAILWINDCSS CLASS NAMES
You use any provided list of TailwindCSS colors in the UI you create. EXAMPLE list: "blue-800,purple-300". To use the colors add a prefix of "bg-", "text-" or similar, e.g "bg-blue-800", "text-purple-300"

## Image Rules
You use images from Unsplash, placehold.co (or similar) or colored rectangles
`

/**
 * Generates a website based on the provided `HtmlPageRequestBody`.
 *
 * Server Action that calls the third-party API directly on the server. This avoids calling the Next.js API route handler allowing for performant Server Components.
 * @note uses the `gpt-4-vision-preview` model and returns a maximum of 4096 output tokens
 * @link https://nextjs.org/docs/app/building-your-application/data-fetching/patterns Next.js Data Fetching Patterns and Best Practices
 */
export async function getHtmlPage(
	/**
	 * @link HtmlPageRequestBody
	 */
	request: HtmlPageRequestBody,
	/**
	 * @link HtmlPageOptions
	 */
	options?: HtmlPageOptions
): Promise<ChatGptCompletionResponse> {
	'use server'
	console.log('handling `getHtmlPage` request')

	const content: ChatMessage['content'] = []

	if (request.src) {
		content.push({
			type: 'image_url',
			// eslint-disable-next-line @typescript-eslint/naming-convention
			image_url: {
				url: request.src,
				detail: 'high',
			},
		})
	}

	if (request.prompt && !request.html) {
		content.push({
			type: 'text',
			text: `Create a website based on these instructions: ${request.prompt}`,
		})
	}

	if (request.prompt && request.html) {
		content.push(
			{
				type: 'text',
				text: `Iterate on the website below based on these instructions: ${request.prompt}`,
			},
			{
				type: 'text',
				text: request.html,
			}
		)
	}

	if (request.theme) {
		content.push({
			type: 'text',
			text: `Also, make the theme for ${request.theme} mode`,
		})
	}

	if (request.colors) {
		content.push({
			type: 'text',
			text: `Use these Tailwind colors: ${request.colors}`,
		})
	}

	console.log('`getHtmlPage` content', content)

	const chatCompletion = await runChatCompletion(
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
			model: 'gpt-4-vision-preview',
			temperature: 0,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			max_tokens: 4096,
		}
	)

	console.log(
		'`getHtmlPage` raw chatCompletion responseText',
		chatCompletion.responseText
	)

	if (chatCompletion.responseText) {
		chatCompletion.responseText = getHtmlFromChatResponseText(
			chatCompletion.responseText
		)
	}

	console.log('`getHtmlPage` chatCompletion response', chatCompletion)

	return chatCompletion
}

export class HtmlPageClient {
	public handle = async (
		request: HtmlPageRequestBody,
		options: HtmlPageOptions
	) => {
		console.log('handling `HtmlPageClient` request', request)
		return await getHtmlPage(request, options)
	}
}
