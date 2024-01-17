/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/naming-convention */
import type {
	ReactNode,
	ElementType,
	DetailedHTMLProps,
	AudioHTMLAttributes,
	ComponentPropsWithRef,
} from 'react'
import { forwardRef } from 'react'
import type { AsComponent } from '../../types'

/**
 * Props to pass to the `<AudioElement>` Component.
 */
export interface AudioElementProps
	extends DetailedHTMLProps<
		AudioHTMLAttributes<HTMLAudioElement>,
		HTMLAudioElement
	> {
	/**
	 * Disclosure to be displayed to end users.
	 * The OpenAI usage policies require you to provide a clear disclosure to end users that the TTS voice they are hearing is AI-generated and not a human voice.
	 * @default 'This audio is AI-generated and not a human voice.'
	 * @link https://openai.com/policies/usage-policies
	 */
	disclosure?: ReactNode
	/**
	 * `<Track>` Server Component with captions for audio-only content.
	 * @link https://www.w3.org/WAI/WCAG21/Understanding/captions-prerecorded.html
	 */
	track?: ReactNode
	/**
	 * Audio source URL.
	 * @example '/my-super-original-podcast.mp3'
	 */
	src: string
	/**
	 * Audio mime type.
	 * @example 'audio/mpeg'
	 */
	type: string
}

/**
 * `<AudioElement>` default element.
 */
export const defaultElement = 'audio'

/**
 * Audio element base component for rendering an `<audio>` node with a `<source>` and optional `<Track>`.
 * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
 */
export const AudioElement = forwardRef(function AudioElement<
	C extends ElementType = typeof defaultElement,
>(
	/**
	 * @link AudioElementProps
	 */
	props: AsComponent<C, AudioElementProps>,
	ref?: ComponentPropsWithRef<C>
) {
	const {
		disclosure = (
			<small>This audio is AI-generated and not a human voice.</small>
		),
		as: Component = defaultElement,
		track,
		src,
		type,
		...rest
	} = props || {}

	return (
		<>
			<Component ref={ref} {...rest}>
				<source src={src} type={type} />
				{track}
			</Component>
			{disclosure}
		</>
	)
})
