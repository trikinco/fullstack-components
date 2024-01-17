/* eslint-disable unicorn/prevent-abbreviations */
'use client'

import { useRef, useState, useEffect, type RefObject } from 'react'

/**
 * A client-side AudioContext and media source handler.
 * @link useAudioSource
 */
export function useAudioContext(
	/**
	 * Enables connecting the audio source to the audio context when the audio file is loaded and the `audioRef` is set.
	 */
	isEnabled?: boolean
): {
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
	 * Audio context.
	 */
	audioContext: AudioContext | null
	/**
	 * Audio source.
	 */
	audioSource: MediaElementAudioSourceNode | null
	/**
	 * Audio element ref.
	 */
	audioRef: RefObject<HTMLAudioElement>
} {
	const audioRef = useRef<HTMLAudioElement>(null)
	const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
	const [audioSource, setAudioSource] =
		useState<MediaElementAudioSourceNode | null>(null)

	// Set the audio source and context after the data is loaded and the audioRef is set
	useEffect(() => {
		if (audioSource || !isEnabled || !audioRef.current) return

		const mediaContext = new AudioContext()

		if (!audioSource && !mediaContext.destination) {
			const mediaSource = mediaContext.createMediaElementSource(
				audioRef.current
			)
			mediaSource.connect(mediaContext.destination)

			setAudioSource(mediaSource)
		}

		setAudioContext(mediaContext)
	}, [isEnabled, audioSource])

	return {
		setAudioContext,
		setAudioSource,
		audioContext,
		audioSource,
		audioRef,
	}
}
