/* eslint-disable @typescript-eslint/naming-convention */
import type OpenAI from 'openai'
import type {
	ReactNode,
	ElementType,
	DetailedHTMLProps,
	AudioHTMLAttributes,
} from 'react'
import type { AsComponent } from '../types'
import { getAudio } from '../handlers/audio/audioClient'
import { renderTreeToString } from '../handlers/text/renderTreeToString'
import { toBase64Url } from '../utils/toBase64Url'
import { removeHtmlTags } from '../utils/removeHtmlTags'
import { Track } from './Track'

/**
 * Props to pass to the `<Audio>` Server Component.
 * @link AudioSpeechModeRequestBody
 */
export interface AudioProps
	extends DetailedHTMLProps<
		AudioHTMLAttributes<HTMLAudioElement>,
		HTMLAudioElement
	> {
	/**
	 * Content to be converted to speech.
	 * @note overrides `children` if both are provided.
	 */
	content?: string
	/**
	 * ID of the model to use.
	 * See the model endpoint compatibility table for details on which models work with the Audio API.
	 * @default 'tts-1-hd'
	 * @link https://platform.openai.com/docs/models/model-endpoint-compatibility
	 */
	model?: OpenAI.Audio.Speech.SpeechCreateParams['model']
	/**
	 * The voice to use when generating the audio.
	 * See the text to speech guide for a preview of the voices available.
	 * @default 'alloy'
	 * @link https://platform.openai.com/docs/guides/text-to-speech/voice-options
	 */
	voice?: OpenAI.Audio.Speech.SpeechCreateParams['voice']
	/**
	 * Prevents generating a caption track.
	 * @note WCAG requires captions for audio-only content.
	 * @link https://www.w3.org/WAI/WCAG21/Understanding/captions-prerecorded.html
	 */
	noCaption?: boolean
	/**
	 * Disclosure to be displayed to end users.
	 * The OpenAI usage policies require you to provide a clear disclosure to end users that the TTS voice they are hearing is AI-generated and not a human voice.
	 * @default 'This audio is AI-generated and not a human voice.'
	 * @link https://openai.com/policies/usage-policies
	 */
	disclosure?: ReactNode
}

const defaultElement = 'audio'

/**
 * Turns text or a React tree into audio.
 * React trees are converted to HTML strings and stripped of HTML tags.
 */
export async function textToSpeech(
	text: ReactNode,
	options?: Pick<AudioProps, 'model' | 'voice'>
) {
	const { model = 'tts-1-hd', voice = 'alloy' } = options || {}
	let content = ''

	if (typeof text !== 'string') {
		const htmlString = await renderTreeToString(text)
		content = removeHtmlTags(htmlString)
	}

	const { responseFile: file, contentType: type } = await getAudio({
		mode: 'speech',
		content,
		model,
		voice,
	})

	/**
	 * @consideration return a stream instead of a string
	 */
	const src = toBase64Url(file, type)

	return {
		src,
		type,
		file,
	}
}

/**
 * Automatically turns text into audio and creates audio captions in WebVTT format.
 * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
 */
export async function Audio<C extends ElementType = typeof defaultElement>(
	/**
	 * @link AudioProps
	 */
	props: AsComponent<C, AudioProps>
) {
	const {
		disclosure = (
			<small className="text-xs">
				This audio is AI-generated and not a human voice.
			</small>
		),
		as: Component = defaultElement,
		noCaption,
		content,
		model,
		voice,
		children,
		...rest
	} = props || {}
	const { src, type, file } = await textToSpeech(children || content || '', {
		model,
		voice,
	})

	return (
		<>
			<Component {...rest}>
				<source src={src} type={type} />
				{!noCaption && <Track file={file} />}
			</Component>
			{disclosure}
		</>
	)
}
