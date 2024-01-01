'use client'

import type { RefObject } from 'react'
import type { AudioRequestBody } from './models'
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
export function useAudio<T = string>(
	/**
	 * @link AudioRequestBody
	 */
	body: AudioRequestBody,
	/**
	 * Fetch utility hook request options without the `fetcher`. Allows for overriding the default `request` config.
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
	 */
	config?: UseRequestConsumerConfig<AudioRequestBody>
): {
	/**
	 * Fetch loading state. `true` if the fetch is in progress.
	 */
	isLoading: boolean
	/**
	 * Fetch error state. `true` if an error occurred.
	 */
	isError: boolean
	/**
	 * Fetch error object if `isError` is `true`
	 */
	error: unknown
	/**
	 * Fetch response data if the fetch was successful.
	 */
	data: T | undefined
	/**
	 * Refetches the data.
	 */
	refetch: () => void
	/**
	 * Plays the audio file.
	 */
	play: () => void
	/**
	 * Pauses the audio file.
	 */
	pause: () => void
	/**
	 * Sets the audio playback rate / speed.
	 */
	setPlayBackRate: (playBackRate: number) => void
	/**
	 * Sets the audio context.
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
	 */
	setAudioContext: (audioContext: AudioContext) => void
	/**
	 * Sets the audio source.
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrackAudioSourceNode
	 */
	setAudioSource: (audioSource: MediaElementAudioSourceNode) => void
	/**
	 * The audio context.
	 */
	audioContext: AudioContext | null
	/**
	 * The audio source.
	 */
	audioSource: MediaElementAudioSourceNode | null
	/**
	 * The audio element ref.
	 */
	audioRef: RefObject<HTMLAudioElement>
	/**
	 * The audio playback rate / speed.
	 */
	playBackRate: number
} {
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
