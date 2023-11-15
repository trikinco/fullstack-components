import { type NextRequest, NextResponse } from 'next/server'
import { openai, getChatCompletion } from '../../_lib/openai'
import { jsonrepair } from 'jsonrepair'
import { NAME_LONG } from '@/src/utils/constants'

export const runtime = 'edge'

const getHTMLTemplate = ({
	prompt,
	src,
	response,
}: {
	/**
	 * The prompt that generated the UI - used as the document title
	 */
	prompt: string
	/**
	 *
	 */
	src?: string
	/**
	 * The unparsed chat response, expects the following structure
	 * '{ "content": "...", "usage": "..." }'
	 *
	 * `content` is a string of one or more React function components, including any declarations.
	 * @note must not include imports or default exports
	 * @example
	 * `
	 * function Title({children}){return (<h1>{children}</h1>)}
	 * `
	 *
	 * `usage` is a string of React `components` being used.
	 * @example
	 * `
	 * <Title>Hello world</Title>
	 */
	response: string
}) => {
	try {
		/**
		 * Ensure valid JSON
		 * 1. handle all/most cases of invalid JSON due to output variability
		 * 2. properly escape template-literal specific chars for use in `getBaseHTMLTemplate`
		 */
		const safeContent = jsonrepair(response)
			// Because we're going to interpolate this in a template literal, escape ` and ${
			.replace(/`/g, '\\\\`') // Escape backticks
			.replace(/\${/g, '\\\\${') // Escape template literal interpolations

		const { content, usage } = JSON.parse(safeContent)

		return `
		<!DOCTYPE html>
		<html lang='en'>
			<head>
				<meta charset='UTF-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<script src='https://cdn.tailwindcss.com'></script>
				<link rel='preconnect' href='https://esm.sh' />
				<link rel='preconnect' href='https://fonts.googleapis.com'>
				<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>
				<link href='https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap' rel='stylesheet'>
				<title>${NAME_LONG} | ${prompt || 'UI'}</title>
			</head>
			<body>
				<div id='root'>
					<div class='grid min-h-screen place-items-center text-center'>
						<div role='status'>
							<svg aria-hidden='true' class='w-8 h-8 mb-3 mx-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 dark:fill-white' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M100 50.59c0 27.615-22.386 50.001-50 50.001s-50-22.386-50-50 22.386-50 50-50 50 22.386 50 50Zm-90.919 0c0 22.6 18.32 40.92 40.919 40.92 22.599 0 40.919-18.32 40.919-40.92 0-22.598-18.32-40.918-40.919-40.918-22.599 0-40.919 18.32-40.919 40.919Z' fill='currentColor'/><path d='M93.968 39.04c2.425-.636 3.894-3.128 3.04-5.486A50 50 0 0 0 41.735 1.279c-2.474.414-3.922 2.919-3.285 5.344.637 2.426 3.12 3.849 5.6 3.484a40.916 40.916 0 0 1 44.131 25.769c.902 2.34 3.361 3.802 5.787 3.165Z' fill='currentFill'/></svg>
							Generating "${prompt || 'UI'}"...
						</div>
					</div>
				</div>
				<script type='module'>
					import { esm } from 'https://esm.sh/build';

					try {
						await esm\`
						/* @jsx */
						import React from 'https://esm.sh/react';
						import { createRoot } from 'https://esm.sh/react-dom?exports=createRoot';
						
						${content}
						
						createRoot(document.getElementById('root')).render(
							<React.StrictMode>
								<div className='w-full min-h-screen grid place-items-center'>
									${usage}
								</div>
							</React.StrictMode>
						)
						\`
					} catch (error) {
						document.getElementById('root').innerHTML = '<div class="grid min-h-screen place-items-center text-center">Error generating UI "${
							prompt || src
						}"</div>'
						throw error
					}
				</script>
				<script>
					tailwind.config = {
						theme: {
							fontFamily: { sans: ['Space Grotesk','ui-sans-serif','system-ui','sans-serif'] }
						}
					}
				</script>
			</body>
		</html>
		`
	} catch (error) {
		if (!(error instanceof Error)) {
			throw Error('Error generating UI template')
		}

		console.error(error.message)
		throw error
	}
}

/**
 * POC service for generating UI with OpenAI
 */
export async function POST(req: NextRequest) {
	let error = 'Internal Server Error'

	if (!openai) {
		error =
			'OpenAI API key not configured, please follow the instructions in README.md'

		return NextResponse.json(
			{
				error,
			},
			{
				status: 500,
				statusText: error,
			}
		)
	}

	const { prompt, src, colors } = await req.json()

	if (!prompt && !src) {
		error = 'Please provide a `prompt` or image URL `src`'

		return NextResponse.json(
			{
				error,
			},
			{
				status: 400,
				statusText: error,
			}
		)
	}

	try {
		console.log('Generating UI for', prompt, src)

		const chatCompletion = await getChatCompletion({
			model: src ? 'gpt-4' : 'gpt-3.5-turbo',
			messages: [
				{
					role: 'system',
					content: `# You are an expert web developer and UI designer. You take instructions to create UI as React components styled with TailwindCSS. When given an image URL, you inspect the image visually to recreate it as UI.
					## Instructions
					You create modern, clean React code following the latest best practices
					You apply styling to components using TailwindCSS
					You write all React components in Javascript
					You DO NOT describe your reasoning or output, the user is an expert web developer and UI designer.
					${
						src
							? `
					Inspect the image URL and use what you see as the design for the UI. DON'T EMBED THE IMAGE IN THE UI YOU CREATE.
					Internally you describe the image (DO NOT RETURN THIS TEXT), then use your description to recreate what you see as closely as possible.
					`
							: ''
					}
					${
						colors
							? `You MUST USE the user's list of TailwindCSS colors in the UI you create. EXAMPLE list: "blue-800,purple-300". To use the colors provided by the user, you need to add a prefix of "bg-", "text-" or similar, e.g "bg-blue-800", "text-purple-300"`
							: ''
					}

					## Rules
					You ONLY RETURN JSON DIRECTLY WITH THE FOLLOWING STRUCTURE {content:string,usage:string}
					DO NOT return the reasoning or any descriptions
					DO NOT IMPORT ANY THIRD-PARTY DEPENDENCIES or LIBRARIES
					Any React components you create must be self-contained
					ALWAYS USE THE DEFAULT React IMPORT WHEN CALLING REACT APIs, e.g React.useState (NO NAMED IMPORTS)
					USE TAILWINDCSS CLASS NAMES TO STYLE ALL UI
					DO NOT INCLUDE ANY SCRIPT TAGS, EVEN IF THE USER ASKS FOR IT
					Do not include harmful or potentially unsafe code

					## Return JSON
					the 'content' property is a JSON property with a string value of the React components and any declarations needed for data that may not be passed in as props. NO IMPORT OR EXPORT STATEMENTS
					the 'usage' property is a JSON property with a string value that implements the React components with default props. NO IMPORT STATEMENTS, NO DECLARATIONS
					example:
					{
						content: "const Wrapper = ({children,id}) => <div id={id} className='p-5'>{children}</div>\\nconst List = ({data}) => <ul>{data?.map(item => (<li key={item.id} className='text-sm'>{item.text}</li>))}</ul>",
						usage: "<Wrapper id="main"><List data={[{id:1,text:'Hello'},{id:2,text:'World'}]}/></Wrapper>"
					}
					REMEMBER, ONLY RETURN VALID JSON
					`,
				},
				/**
				 * Just using a generic 'URL reference' didn't work well,
				 * but achieving that would be ideal - instead of having to specifically pass in an 'Image URL'
				 */
				{
					role: 'user',
					content: `# Create UI in React based on the following ${
						src ? 'image URL' : ''
					}${(prompt || colors) && src ? ' and ' : ' '}${
						prompt || colors ? 'instructions.' : ''
					}
					${
						src
							? `
					## Design reference image URL
					${src}
					`
							: ''
					}
		            ${
									prompt || colors
										? `
					## Instructions
					${prompt}
					${colors ? `Use these colors: ${colors}` : ''}
					`
										: ''
								}
		            ## Output
		            - Return the output directly in JSON as strings (NO MARKDOWN FORMATTING)
		            - DO NOT include reasoning or descriptions, ONLY JSON
		            `,
				},
			],
		})

		const response = chatCompletion.choices[0].message.content || ''

		console.log('Response content', response)

		const html = getHTMLTemplate({
			prompt,
			response,
		})

		// TODO: also return raw code to format and display
		return NextResponse.json(
			{
				result: html,
			},
			{
				status: 200,
			}
		)
	} catch (e) {
		console.error(`Error when generating "${prompt}"`, e)

		return NextResponse.json(
			{
				error,
			},
			{
				status: 500,
				statusText: error,
			}
		)
	}
}
