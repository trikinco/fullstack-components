/* eslint-disable unicorn/prevent-abbreviations */
'use client'

import { useState, useEffect, type RefObject } from 'react'
import { useInterval } from '../../hooks/useInterval'
import { useAudioContext } from './useAudioContext'

/**
 * A client-side audio file handler with some basic utilities for controlling audio file playback.
 * @link useAudio
 */
export function useAudioSource(
	/**
	 * Enables connecting the audio source to the audio context when the audio file is loaded and the `audioRef` is set.
	 */
	isEnabled?: boolean
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
	 * Toggles the audio file playback state between playing and paused.
	 */
	togglePlayPause: () => void
	/**
	 * Sets the audio playback rate / speed.
	 */
	setPlayBackRate: (playBackRate: number) => void
	/**
	 * Sets the current time of the audio.
	 */
	setCurrentTime: (time: number) => void
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
	 * Sets the audio playback state.
	 */
	setIsPlaying: (isPlaying: boolean) => void
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
	/**
	 * Audio playback rate / speed.
	 */
	playBackRate: number
	/**
	 * Current audio time.
	 */
	currentTime: number
	/**
	 * Audio play state.
	 */
	isPlaying?: boolean
} {
	const {
		audioRef,
		audioSource,
		audioContext,
		setAudioSource,
		setAudioContext,
	} = useAudioContext(isEnabled)
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [playBackRate, setPlayBackRate] = useState(1)

	// Set the playback rate / audio speed when the `playBackRate` state changes
	useEffect(() => {
		if (!audioRef.current || !isEnabled) return

		audioRef.current.playbackRate = playBackRate
	}, [playBackRate])

	// Ensure the play state is set to false when the audio ends
	useEffect(() => {
		const audio = audioRef.current

		if (!audio || !isEnabled) return

		const handleState = () => {
			setIsPlaying(false)
		}

		audio.addEventListener('ended', handleState)

		return () => {
			audio.removeEventListener('ended', handleState)
		}
	}, [isEnabled])

	/**
	 * Set the current time when the audio is playing.
	 *
	 * Uses an interval instead of the 'timeupdate' event to
	 * allow for fast and smooth time updates.
	 */
	useInterval(
		() => {
			setCurrentTime(audioRef.current?.currentTime ?? 0)
		},
		// Delay in milliseconds or null to stop it
		isPlaying ? 20 : null
	)

	// Play the audio when the `audioRef` is set
	const play = () => {
		setIsPlaying(true)

		// Check if the audio context is in suspended state (autoplay policy)
		if (audioContext?.state === 'suspended') {
			void audioContext.resume()
		}

		void audioRef.current?.play()
	}

	// Pause the audio when the `audioRef` is set
	const pause = () => {
		setIsPlaying(false)
		audioRef.current?.pause()
	}

	// Toggle the audio playback state between play and pause
	const togglePlayPause = () => {
		if (
			audioRef.current?.currentTime === 0 ||
			audioRef.current?.paused ||
			audioRef.current?.ended
		) {
			return play()
		}

		return pause()
	}

	return {
		play,
		pause,
		togglePlayPause,
		setPlayBackRate,
		setIsPlaying,
		setCurrentTime,
		setAudioContext,
		setAudioSource,
		audioContext,
		audioSource,
		audioRef,
		playBackRate,
		currentTime,
		isPlaying,
	}
}
