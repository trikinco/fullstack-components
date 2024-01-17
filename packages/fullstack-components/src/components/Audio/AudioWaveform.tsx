/* eslint-disable @typescript-eslint/naming-convention */
'use client'
import type {
	ElementType,
	ReactNode,
	DetailedHTMLProps,
	InputHTMLAttributes,
	ButtonHTMLAttributes,
	SVGProps,
	HTMLAttributes,
} from 'react'
import type { AsComponent } from '../../types'
import { merge } from '../../utils'
import { useAudioSource } from '../../handlers/audio/useAudioSource'
import { AudioScrubber, type AudioScrubberProps } from './AudioScrubber'
import { AudioElement, type AudioElementProps } from './AudioElement'
import { IconPause } from '../Icons/IconPause'
import { IconPlay } from '../Icons/IconPlay'

/**
 * Props to pass to the `<AudioWaveform>` Client Component.
 */
export interface AudioWaveformProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	/**
	 * Audio source URL.
	 * @example '/my-super-original-podcast.mp3'
	 */
	src?: string
	/**
	 * Audio mime type.
	 * @example 'audio/mpeg'
	 */
	type?: string
	/**
	 * `<Track>` Server Component with captions for audio-only content.
	 * @example `<Track src="/my-super-original-podcast.mp3" default />`
	 * @link https://www.w3.org/WAI/WCAG21/Understanding/captions-prerecorded.html
	 */
	track?: ReactNode
	/**
	 * Disclosure to be displayed to end users.
	 * The OpenAI usage policies require you to provide a clear disclosure to end users that the TTS voice they are hearing is AI-generated and not a human voice.
	 * @default 'This audio is AI-generated and not a human voice.'
	 * @link https://openai.com/policies/usage-policies
	 */
	disclosure?: ReactNode
	/**
	 * Container `<div>` with the play/pause `<button>` and `<AudioScrubber>`.
	 */
	containerProps?: DetailedHTMLProps<
		HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	>
	/**
	 * Props for the `<button>` to toggle play & pause.
	 */
	buttonProps?: DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>
	/**
	 * Label or icon to show when toggling play in the `<button>`.
	 * @default An `<svg>` play icon
	 */
	labelPlay?: ReactNode
	/**
	 * Label or icon to show when toggling pause in the `<button>`.
	 * @default An `<svg>` pause icon
	 */
	labelPause?: ReactNode
	/**
	 * `<AudioElement>` props.
	 * @link AudioElementProps
	 */
	audioProps?: Partial<Omit<AudioElementProps, 'ref'>>
	/**
	 * `<AudioScrubber>` props.
	 * @link AudioScrubberProps
	 */
	scrubberProps?: Partial<AudioScrubberProps>
	/**
	 * `<svg>` in `<AudioScrubber>` containing all elements needed to display the waveform.
	 */
	svgProps?: SVGProps<SVGSVGElement>
	/**
	 * `<input>` in `<AudioScrubber>` used as the timeline scrubber.
	 */
	inputProps?: DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	>
}

/**
 * `<AudioWaveform>` default wrapper element.
 */
const defaultElement = 'div'

/**
 * Audio Client Component with minimal controls and a waveform visualization.
 * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
 */
export function AudioWaveform<C extends ElementType = typeof defaultElement>(
	/**
	 * @link AudioWaveformProps
	 */
	props: AsComponent<C, AudioWaveformProps>
) {
	const {
		as: Component = defaultElement,
		labelPlay = <IconPlay width={20} height={20} />,
		labelPause = <IconPause width={20} height={20} />,
		className,
		containerProps,
		buttonProps,
		scrubberProps,
		audioProps,
		svgProps,
		inputProps,
		type,
		src,
		...rest
	} = props || {}
	const { className: classNameContainer, ...containerRest } =
		containerProps || {}
	const { className: classNameButton, ...buttonRest } = buttonProps || {}

	const {
		isPlaying,
		audioRef,
		audioContext,
		currentTime,
		setCurrentTime,
		togglePlayPause,
	} = useAudioSource(!!src)

	return (
		<Component className={merge('flex flex-col gap-2', className)} {...rest}>
			<div
				className={merge('flex sm:gap-2', classNameContainer)}
				{...containerRest}
			>
				<button
					type="button"
					className={merge('p-2 shrink-0', classNameButton)}
					onClick={() => togglePlayPause()}
					aria-label={isPlaying ? 'Pause' : 'Play'}
					{...buttonRest}
				>
					<span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
					{isPlaying ? labelPause : labelPlay}
				</button>

				<AudioScrubber
					src={src}
					audioRef={audioRef}
					context={audioContext}
					currentTime={currentTime}
					setCurrentTime={setCurrentTime}
					svgProps={svgProps}
					inputProps={inputProps}
					{...scrubberProps}
				/>
			</div>

			<AudioElement ref={audioRef} src={src} type={type} {...audioProps} />
		</Component>
	)
}
