'use client'
import { request, type RequestConfigOnly } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import type { AudioResponseBody, AudioRequestBody } from './models'

/**
 * Depending on the `mode`, `speech` generates audio files from text or `transcriptions` and `translations` generates text from audio.
 *
 * Audio client-side fetch handler that calls the internal Next.js API route handler, then the third-party API. Best used for Client Components and functionality.
 * @see `ApiUrlEnum.audio`
 * @returns {Promise<AudioResponseBody>} text or audio file blob URL.
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
) {
	return request<AudioResponseBody>(ApiUrlEnum.audio, {
		body,
		responseType: body.mode === 'speech' ? 'blob' : 'json',
		...config,
	})
}
