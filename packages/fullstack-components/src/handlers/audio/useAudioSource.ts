/* eslint-disable unicorn/no-null */
/* eslint-disable unicorn/prevent-abbreviations */
'use client'

import { useRef, useState, useEffect } from 'react'

/**
 * A client-side audio file handler with some basic utilities for controlling audio file playback.
 * @link useAudio
 */
export function useAudioSource(
	/**
	 * Enables connecting the audio source to the audio context when the audio file is loaded and the `audioRef` is set.
	 */
	isEnabled: boolean
) {
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
		play,
		pause,
		setPlayBackRate,
		setAudioContext,
		setAudioSource,
		audioContext,
		audioSource,
		audioRef,
		playBackRate,
	}
}
