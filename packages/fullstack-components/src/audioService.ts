/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import OpenAI from 'openai'
import type {
	AudioSpeechModeRequestBody,
	AudioTranscriptionModeRequestBody,
	AudioTranslationModeRequestBody,
} from './types/audio'

export type AudioResponseBase = {
	tokensUsed?: number
	finishReason?: string
	errorMessage?: string
}

export interface AudioTextResponse extends AudioResponseBase {
	responseText: string
}

export interface AudioFileResponse extends AudioResponseBase {
	/**
	 * The audio file as an ArrayBuffer.
	 */
	responseFile: ArrayBuffer
	/**
	 * The OpenAI `response_format`, used to determine the file extension.
	 * @default 'mp3'
	 */
	responseFormat: string
	/**
	 * The `Content-Type` header from the OpenAI response passed through.
	 * @default 'audio/mpeg'
	 */
	contentType: string
}

type AudioServiceOptions = {
	/**
	 * @default `process.env.OPENAI_API_KEY`.
	 */
	openAIApiKey: string
}

export type AudioOptions = (
	| AudioSpeechModeRequestBody
	| AudioTranscriptionModeRequestBody
	| AudioTranslationModeRequestBody
) &
	AudioServiceOptions

export async function runAudioService(
	options: AudioOptions
): Promise<AudioTextResponse | AudioFileResponse> {
	console.log('Running audio service')

	try {
		const response = await getAudioRequest(options)

		if (options.mode === 'speech') {
			const res = response as Awaited<ReturnType<OpenAI.Audio.Speech['create']>>
			const contentType = res.headers.get('content-type') || 'audio/mpeg'
			const responseFormat = options?.response_format || 'mp3'
			const audioBuffer = await res.arrayBuffer()

			if (audioBuffer === undefined) {
				throw new Error('Could not extract arrayBuffer from speech response')
			}

			return {
				responseFile: audioBuffer,
				responseFormat,
				contentType,
			} as AudioFileResponse
		} else {
			const res = response as Awaited<
				| ReturnType<OpenAI.Audio.Transcriptions['create']>
				| ReturnType<OpenAI.Audio.Translations['create']>
			>
			// Depending on the `response_format`, the response body will be different
			const extractedText = res.text || (res as unknown as string)

			if (extractedText === undefined || typeof extractedText !== 'string') {
				throw new Error(`Could not extract text from ${options.mode} response`)
			}

			console.log(`${options.mode} text`, extractedText)

			return {
				responseText: extractedText || '',
			} as AudioTextResponse
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

async function getAudioRequest(options: AudioOptions) {
	const openai = new OpenAI({
		apiKey: options.openAIApiKey,
	})

	switch (options.mode) {
		case 'transcription': {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { mode, content, openAIApiKey, ...parameters } = options || {}
			return await openai.audio.transcriptions.create({
				model: 'whisper-1',
				language: 'en',
				file: content,
				...parameters,
			})
		}
		case 'translation': {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { mode, content, openAIApiKey, ...parameters } = options || {}
			return await openai.audio.translations.create({
				model: 'whisper-1',
				file: content,
				...parameters,
			})
		}
		default: {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { mode, content, openAIApiKey, ...parameters } = options || {}
			return await openai.audio.speech.create({
				model: 'tts-1-hd',
				voice: 'alloy',
				input: content,
				...parameters,
			})
		}
	}
}
