/* eslint-disable unicorn/no-null */
/* eslint-disable unicorn/prevent-abbreviations */
'use client'

import { useRef, useState, useEffect, type RefObject } from 'react'

/**
 * A client-side audio file handler with some basic utilities for controlling audio file playback.
 * @link useAudio
 */
export function useAudioSource(
	/**
	 * Enables connecting the audio source to the audio context when the audio file is loaded and the `audioRef` is set.
	 */
	isEnabled: boolean
): {
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
	const audioRef = useRef<HTMLAudioElement>(null)
	const [playBackRate, setPlayBackRate] = useState(1)
	const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
	const [audioSource, setAudioSource] =
		useState<MediaElementAudioSourceNode | null>(null)

	// Set the audio source and context after the data is loaded and the audioRef is set
	useEffect(() => {
		if (audioSource || !isEnabled || !audioRef.current) return

		const mediaContext = new AudioContext()
		const mediaSource = mediaContext.createMediaElementSource(audioRef.current)
		mediaSource.connect(mediaContext.destination)

		setAudioContext(mediaContext)
		setAudioSource(mediaSource)
	}, [isEnabled, audioSource])

	// Set the playback rate / audio speed when the `playBackRate` state changes
	useEffect(() => {
		if (!audioRef.current || !isEnabled) return

		audioRef.current.playbackRate = playBackRate
	}, [playBackRate])

	// Play the audio when the `audioRef` is set
	const play = () => {
		// Check if the audio context is in suspended state (autoplay policy)
		if (audioContext?.state === 'suspended') {
			void audioContext.resume()
		}

		void audioRef.current?.play()
	}

	// Pause the audio when the `audioRef` is set
	const pause = () => {
		audioRef.current?.pause()
	}

	return {
		/**
		 * Starts playing the audio file.
		 */
		play,
		/**
		 * Pauses the audio file.
		 */
		pause,
		/**
		 * Sets the audio playback rate / speed.
		 */
		setPlayBackRate,
		/**
		 * Sets the audio context.
		 * @link https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
		 */
		setAudioContext,
		/**
		 * Sets the audio source.
		 * @link https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrackAudioSourceNode
		 */
		setAudioSource,
		/**
		 * The audio context.
		 */
		audioContext,
		/**
		 * The audio source.
		 */
		audioSource,
		/**
		 * The audio element ref.
		 */
		audioRef,
		/**
		 * The audio playback rate / speed.
		 */
		playBackRate,
	}
}
