'use client'

import type { AudioResponseBody, AudioRequestBody } from './models'
import {
	useRequest,
	type UseRequestConsumerConfig,
} from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import { useAudioSource } from './useAudioSource'

/**
 * A client-side fetch handler hook that generates audio files from text or text from audio.
 * Includes utilities for controlling the audio file playback when the `mode` is `speech`.
 * @see `ApiUrlEnum.audio`
 */
export function useAudio<T = AudioResponseBody>(
	/**
	 * @link AudioRequestBody
	 */
	body: AudioRequestBody,
	/**
	 * Fetch utility hook request options without the `fetcher`. Allows for overriding the default `request` config.
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
	 */
	config?: UseRequestConsumerConfig<AudioRequestBody>
) {
	const isSpeechMode = body.mode === 'speech'
	const { data, isLoading, ...methods } = useRequest<T>(ApiUrlEnum.audio, {
		body,
		responseType: isSpeechMode ? 'blob' : 'json',
		...config,
	})

	const audioMethods = useAudioSource(!isLoading && !!data && isSpeechMode)

	return {
		...audioMethods,
		// Request state
		data,
		isLoading,
		...methods,
	}
}
