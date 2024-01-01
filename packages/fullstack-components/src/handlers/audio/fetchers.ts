'use client'
import { request, type RequestConfigOnly } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import type { AudioRequestBody } from './models'

/**
 * Depending on the `mode`, `speech` generates audio files from text or `transcriptions` and `translations` generates text from audio.
 *
 * Client-side fetch handler that calls the internal Next.js API route handler, then the third-party API. Best used for Client Components and functionality.
 * @see `ApiUrlEnum.audio`
 */
export function fetchAudio(
	/**
	 * @link AudioRequestBody
	 */
	body: AudioRequestBody,
	/**
	 * Fetch utility request options without the `body`
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
	 */
	config?: RequestConfigOnly
): Promise<string> {
	return request<string>(ApiUrlEnum.audio, {
		body,
		responseType: body.mode === 'speech' ? 'blob' : 'json',
		...config,
	})
}
