'use client'
import { useEffect, useState, useId } from 'react'

export interface UseAudioWaveformProps {
	/**
	 * Spacing between each SVG `<line>`.
	 */
	spacing?: number
	/**
	 * Stroke width of each SVG `<line>`.
	 */
	strokeWidth?: number
	/**
	 * Number of amplitude samples to take.
	 */
	sampleSize?: number
	/**
	 * Normalization multiplier.
	 */
	normal?: number
	/**
	 * Audio file / audio context buffer.
	 */
	context?: AudioContext | null
	/**
	 * Audio URL.
	 */
	src?: string
}

/**
 * Process audio buffer data into peaked / max amplitude waveform values.
 *
 * This type of waveform is more like an average, with less granular vizualisation
 * of the audio values. This lends itself more to a stylized vizualisation, rather
 * than exactly depicting the full audible range.
 */
export function getPeakWaveformData(
	/**
	 * Audio file / audio context buffer.
	 */
	audioBuffer: AudioBuffer,
	/**
	 * Number of amplitude samples to take.
	 */
	sampleSize: number,
	/**
	 * Normalization multiplier.
	 */
	normal: number
) {
	const rawData = audioBuffer.getChannelData(0) // Get data of first channel
	const samples = []
	const blockSize = Math.floor(rawData.length / sampleSize) // Size of each block of data for one sample

	for (let i = 0; i < sampleSize; i++) {
		const blockStart = blockSize * i // Start index of the block
		let peak = 0

		// Find peak (max amplitude) in the block
		for (let j = 0; j < blockSize; j++) {
			const amplitude = Math.abs(rawData[blockStart + j])
			peak = amplitude > peak ? amplitude : peak
		}

		// Push the peak value
		samples.push(peak)
	}

	// Normalize samples to a range suitable for SVG rendering (e.g., 0 to 50)
	const maxSampleValue = Math.max(...samples)

	return samples.map((value) => (value / maxSampleValue) * normal)
}

/**
 * Creates audio waveform vizualisation data from an audio file used to render an `<svg>`.
 */
export function useAudioWaveform({
	src,
	context,
	spacing = 4,
	strokeWidth = 2,
	sampleSize = 200,
	normal = 20,
}: UseAudioWaveformProps) {
	const [data, setData] = useState<number[]>([])
	const id = useId()
	const width = (data.length + strokeWidth / 2) * spacing
	const height = normal * 2

	useEffect(() => {
		if (!src || !context) return

		/**
		 * 1. Fetch the audio Blob.
		 * 2. Transform the Blob to an `ArrayBuffer` as needed by the audio context.
		 * 3. Decode the `ArrayBuffer` in the context to extract an `AudioBuffer`.
		 * 4. Traverse the audio buffer channel data to get the SVG line data in our
		 *    desired format for visualizing the audio.
		 */
		const processAudioContext = async () => {
			const response = await fetch(src)
			const arrayBuffer = await response.arrayBuffer()
			const audioBuffer = await context.decodeAudioData(arrayBuffer)
			const data = getPeakWaveformData(audioBuffer, sampleSize, normal)

			setData(data)
		}

		void processAudioContext()
	}, [src, context, sampleSize, normal])

	return {
		// `id` for the dataset
		id,
		// Calculated width
		width,
		// Calculated height
		height,
		// Waveform data
		data,
	}
}

export default useAudioWaveform
