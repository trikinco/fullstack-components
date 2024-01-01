import {
	runAudioService,
	type AudioFileResponse,
	type AudioTextResponse,
} from '../../audioService'
import { OPENAI_API_KEY } from '../../utils/constants'
import { type AudioRequestBody, type AudioOptions, AudioError } from './models'
import type { AudioMode } from '../../types/audio'

/**
 * The response type depends on the `mode`.
 * `speech` return `AudioFileResponse`
 * `transcription` and `translation` return `AudioTextResponse`
 */
export type GetAudioResponse<T extends AudioMode> = T extends 'speech'
	? AudioFileResponse
	: AudioTextResponse

/**
 * Depending on the `mode`, `speech` generates audio files from text or `transcriptions` and `translations` generates text from audio.
 *
 * Server Action that calls the third-party API directly on the server. This avoids calling the Next.js API route handler allowing for performant Server Components.
 * @link https://nextjs.org/docs/app/building-your-application/data-fetching/patterns Next.js Data Fetching Patterns and Best Practices
 */
export async function getAudio<T extends AudioMode>(
	/**
	 * @link AudioRequestBody
	 */
	request: AudioRequestBody & { mode: T },
	/**
	 * @link AudioOptions
	 */
	options?: AudioOptions
): Promise<GetAudioResponse<T>> {
	'use server'
	console.log('handling `getAudio` request', request)

	if (!request.mode) {
		throw new AudioError(new Error('Audio `mode` is required'))
	}

	if (!request.content) {
		throw new AudioError(new Error('Audio `content` is required'))
	}

	return (await runAudioService({
		openAIApiKey: options?.openAiApiKey || OPENAI_API_KEY,
		...request,
	})) as GetAudioResponse<T>
}

export class AudioClient {
	public handle = async (request: AudioRequestBody, options: AudioOptions) => {
		console.log('handling `AudioClient` request', request)

		return await getAudio(request, options)
	}
}
