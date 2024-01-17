/* eslint-disable @typescript-eslint/naming-convention */
'use client'
import type {
	ElementType,
	RefObject,
	DetailedHTMLProps,
	InputHTMLAttributes,
	SVGProps,
	ChangeEvent,
	CSSProperties,
} from 'react'
import type { AsComponent } from '../../types'
import { Waveform } from '../Waveform'
import { merge } from '../../utils'
import { useAudioWaveform } from '../../handlers/audio/useAudioWaveform'

/**
 * Props to pass to the `<AudioScrubber>` Client Component.
 */
export interface AudioScrubberProps
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	/**
	 * Audio source URL.
	 * @example '/my-super-original-podcast.mp3'
	 */
	src?: string
	/**
	 * Audio file `AudioContext`.
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
	 */
	context?: AudioContext | null
	/**
	 * Ref to the `<audio>` element.
	 */
	audioRef: RefObject<HTMLAudioElement>
	/**
	 * `<svg>` containing all elements needed to display the waveform.
	 */
	svgProps?: SVGProps<SVGSVGElement>
	/**
	 * `<input>` used as the timeline scrubber.
	 */
	inputProps?: DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	>
	/**
	 * Opacity of the `<svg>` showing the remaining / not played part of the waveform.
	 * @default 0.3
	 */
	remainingOpacity?: number
	/**
	 * Current playback time.
	 */
	currentTime: number
	/**
	 * Sets the `currentTime` of the audio.
	 */
	setCurrentTime: (
		/**
		 * Current playback time.
		 */
		time: number
	) => void
}

/**
 * `<AudioScrubber>` default wrapper element.
 */
const defaultElement = 'div'

/**
 * Scrubber controls for audio with a waveform visualization.
 * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
 */
export function AudioScrubber<C extends ElementType = typeof defaultElement>(
	/**
	 * @link AudioScrubberProps
	 */
	props: AsComponent<C, AudioScrubberProps>
) {
	const {
		setCurrentTime,
		currentTime = 0,
		className,
		src,
		context,
		audioRef,
		svgProps,
		inputProps,
		remainingOpacity = 0.3,
		as: Component = defaultElement,
		...rest
	} = props || {}
	const { className: classNameSvg, ...svgRest } = svgProps || {}
	const { className: classNameInput, ...inputRest } = inputProps || {}

	const { id, width, height, data } = useAudioWaveform({
		src,
		context,
	})

	// Percentage of remaining time used for clip-paths
	const remaining =
		100 - (currentTime / (audioRef?.current?.duration ?? 0)) * 100

	/**
	 * Set the current audio time when sliding the scrubber
	 */
	const handleScrubberChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (!audioRef?.current) return

		const newTime = Number.parseFloat(event.target.value)

		audioRef.current.currentTime = newTime
		setCurrentTime?.(newTime)
	}

	return (
		<Component
			className={merge('relative w-full', className)}
			style={
				{
					'--remaining': `${remaining}%`,
				} as CSSProperties
			}
			{...rest}
		>
			<svg
				width={width}
				height={height}
				viewBox={`0 0 ${width} ${height}`}
				className={merge('w-full', classNameSvg)}
				aria-label="Waveform visualization"
				{...svgRest}
			>
				<defs>
					<Waveform width={width} height={height} data={data} id={id} />
				</defs>

				<use href={`#${id}`} opacity={remainingOpacity} />
				<use
					href={`#${id}`}
					style={{ clipPath: 'inset(0 var(--remaining) 0 0)' }}
				/>
			</svg>

			<input
				className={merge(
					'appearance-none cursor-pointer bg-transparent absolute w-full inset-0',
					classNameInput
				)}
				type="range"
				value={currentTime}
				onChange={handleScrubberChange}
				step="any" // the most granular steps possible for smooth scrubbing
				min="0"
				max={audioRef?.current?.duration || undefined}
				aria-label="Seek slider"
				{...inputRest}
			/>
		</Component>
	)
}
