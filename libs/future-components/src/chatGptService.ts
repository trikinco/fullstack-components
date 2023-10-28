/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import OpenAI from 'openai'
// NOTE: With the nextjs build system, in the config for this library,
// we can't use the encoder. So just doing a super basic count letters / NuMBER
// instead
//import { encode } from 'gpt-3-encoder'

export type ChatMessage = {
	role: 'system' | 'user' | 'assistant'
	content: string
}

export type ChatGptCompletionResponse = {
	responseText: string
	tokensUsed: number
	finishReason?: string
	errorMessage?: string
}

export async function runChatCompletion(
	messages: ChatMessage[],
	options: { openAIApiKey: string; temperature?: number }
): Promise<ChatGptCompletionResponse> {
	const openai = new OpenAI({
		apiKey: options.openAIApiKey,
	})
	const model = selectBestModel(messages)
	console.log('Running chat completion', messages)
	try {
		const completion = await openai.chat.completions.create({
			model: model,
			temperature: options.temperature || 0.9,
			messages,
		})

		const extractedText = completion.choices[0].message?.content
		if (extractedText === undefined) {
			throw new Error('Could not extract text from completion')
		}
		console.log('chat completion response', extractedText)
		return {
			tokensUsed: completion.usage?.total_tokens || 0,
			finishReason: completion.choices[0].finish_reason,
			responseText: extractedText || '',
		}
	} catch (error) {
		// try not to throw from here. makes the path easier to follow in callers
		// the http library will throw on 400s from cat gpt but these are handlable errors
		const finishReason = (error as any)?.data?.choices?.[0]?.finish_reason
		const tokensUsed = (error as any)?.data?.usage?.total_tokens || 0
		let errorMessage = (error as Error).message
		if (errorMessage.includes('400')) {
			errorMessage = `${errorMessage}: This usually means that we have exceeded the maximum number of tokens for the api. Or your api key is invalid.`
		}
		return {
			tokensUsed: tokensUsed,
			finishReason,
			responseText: '',
			errorMessage,
		}
	}
}

function selectBestModel(chatMessages: ChatMessage[]) {
	let model = 'gpt-3.5-turbo'
	const length = chatMessages.map((c) => c.content).join('').length / 3
	if (length > 15_750) {
		throw new Error(
			'Too many tokens! Too much happened during this period for the LLM to make sense of it.'
		)
	}
	if (length > 3800) {
		model = 'gpt-3.5-turbo-16k'
	}
	console.log('using gpt model', model)
	return model
}
