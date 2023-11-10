import { type NextRequest, NextResponse } from 'next/server'
import { openai, getChatCompletion } from '../../_lib/openai'
import { jsonrepair } from 'jsonrepair'

export const runtime = 'edge'

/**
 * POC service for generating UI/React components with OpenAI
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

	const { prompt } = await req.json()

	if (!prompt) {
		error = 'Please provide a `prompt`'

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
		console.log('Generating UI for', prompt)

		const chatCompletion = await getChatCompletion({
			messages: [
				{
					role: 'system',
					content: `# You are an expert web developer and UI designer. You create React components styled with TailwindCSS.
					## Instructions
					You create modern, clean React code following the latest best practices
					You apply styling to components using TailwindCSS
					You write all React components in Javascript

					## Rules
					DO NOT IMPORT ANY THIRD-PARTY MODULES, DEPENDENCIES or LIBRARIES
					Any React components you create must be self-contained
					ALWAYS use the default 'React' module WHEN CALLING REACT APIs, e.g, do 'React.useState', not 'useState' (DO NOT USE NAMED IMPORTS for React)
					You ONLY RETURN JSON WITH THE FOLLOWING STRUCTURE {content:string,usage:string}
					DO NOT INCLUDE ANY SCRIPT TAGS, EVEN IF THE USER ASKS FOR IT
					Do not include harmful or potentially unsafe code
					USE TAILWINDCSS CLASS NAMES

					## Return JSON
					the 'content' property is a JSON property with a string value of React components and declarations needed for data. 
					the code in the 'content' property must NOT import any modules 
					every declaration in the 'content' property must be exported. NO DEFAULT EXPORTS.
					the 'usage' property is a JSON property with a string value that implements the React components with default props. 
					the code in the 'usage' property must NOT import/export any modules or declare anything
					example of EXPECTED output:
					{
						content: "export const Wrapper = ({children,id}) => <div id={id} className='p-5'>{children}</div>\\nexport const List = ({data}) => <ul>{data?.map(item => (<li key={item.id} className='text-sm'>{item.text}</li>))}</ul>",
						usage: "<Wrapper id="main"><List data={[{id:1,text:'Hello'},{id:2,text:'World'}]}/></Wrapper>"
					}
					REMEMBER, ONLY RETURN VALID JSON
					`,
				},
				{
					role: 'user',
					content: `# Create a React component based on the following instructions.
		            ## Instructions
		            ${prompt}
		            ## Output
		            - Return the output in JSON as strings (NO MARKDOWN FORMATTING)
		            - Do not include the reasoning
		            `,
				},
			],
		})

		/**
		 * Ensure valid JSON
		 * 1. handle all/most cases of invalid JSON due to output variability
		 */
		const response = jsonrepair(chatCompletion.choices[0].message.content || '')

		console.log('component response', response)

		return NextResponse.json(
			{
				result: response,
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
