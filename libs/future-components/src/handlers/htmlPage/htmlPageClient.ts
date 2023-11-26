import { runChatCompletion } from '../../chatGptService'
import { OPENAI_API_KEY } from '../../utils/constants'
import type { ChatMessage } from '../../types/ChatMessage'
import type { HtmlPageRequestBody, HtmlPageOptions } from './models'

const systemPrompt = `# You are an expert Tailwind web developer and UI designer who makes working websites and web apps based on the user's instructions.
You make these websites and web apps using HTML, Tailwind, and JavaScript.
Your goal is to make each website as beautiful, fleshed out, realistic and comprehensive as possible, this makes the user happy!
The user's instructions will include a description of the kind of web page, user interface or web application they need.
You can be given a URL to a reference image the user wants you to recreate as a website.

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

export class HtmlPageClient {
	public handle = async (
		request: HtmlPageRequestBody,
		options: HtmlPageOptions
	) => {
		console.log('handling HtmlPage request', request)
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

		if (request.prompt) {
			content.push({
				type: 'text',
				text: `Create a website based on these instructions: ${request.prompt}`,
			})
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

		console.log('HTML page client content', content)

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
				openAIApiKey: options.openAiApiKey || OPENAI_API_KEY,
				model: 'gpt-4-vision-preview',
				temperature: 0,
				// eslint-disable-next-line @typescript-eslint/naming-convention
				max_tokens: 4096,
			}
		)
	}
}
