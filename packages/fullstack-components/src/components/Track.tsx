import type OpenAI from 'openai'
import type { FileLike } from 'openai/uploads'
import type { DetailedHTMLProps, TrackHTMLAttributes } from 'react'
import { transformVTT, type Cue } from '../handlers/audio/audioVttParser'
import fs from 'fs'
import { getAudio } from '../handlers/audio/audioClient'
import { getApiFile } from '../utils/getApiFile'
import { toBase64Url } from '../utils/toBase64Url'

export type { Cue } from '../handlers/audio/audioVttParser'

/**
 * Props to pass to the `<Track>` Server Component.
 * @link AudioTranscriptionModeRequestBody
 */
export interface TrackProps
	extends Omit<
		DetailedHTMLProps<TrackHTMLAttributes<HTMLTrackElement>, HTMLTrackElement>,
		'src'
	> {
	/**
	 * ID of the model to use.
	 * See the model endpoint compatibility table for details on which models work with the Audio API.
	 * @default 'whisper-1'
	 * @link https://platform.openai.com/docs/models/model-endpoint-compatibility
	 */
	model?: OpenAI.Audio.Transcriptions.TranscriptionCreateParams['model']
	/**
	 * The language of the input audio. Supplying the input language in ISO-639-1 format will improve accuracy and latency.
	 * @default 'en'
	 */
	language?: OpenAI.Audio.Transcriptions.TranscriptionCreateParams['language']
	/**
	 * An optional text to guide the model's style or continue a previous audio
	 * segment. The prompt should match the audio language.
	 * @default `vtt ${kind} for this ${media} file`
	 * @link https://platform.openai.com/docs/guides/speech-to-text/prompting
	 */
	prompt?: OpenAI.Audio.Transcriptions.TranscriptionCreateParams['prompt']
	/**
	 * The type of media to which the text track belongs.
	 * @default 'audio'
	 */
	media?: 'audio' | 'video'
	/**
	 * Full file name including file extension of the audio file to transcribe.
	 * @note if this is removed, the API call will fail.
	 * @default 'audio.mpeg'
	 */
	name?: string
	/**
	 * The type of audio file to generate a text transcript from.
	 * @default 'audio/mpeg'
	 */
	type?:
		| 'audio/flac'
		| 'audio/mpeg'
		| 'audio/mp4'
		| 'audio/ogg'
		| 'audio/wav'
		| 'audio/webm'
	/**
	 * How the text track is meant to be used. Captions are necessary for deaf viewers to understand the content. Captions include a text description of all important background noises and other sounds, in addition to the text of all dialog and narration. Subtitles are generally language translations, to help listeners understand content presented in a language they don't understand. Subtitles generally include only dialog and narration.
	 * @default 'captions'
	 * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track#kind
	 */
	kind?: 'captions' | 'subtitles' | 'descriptions' | 'chapters' | 'metadata'
	/**
	 * Label to use for the track. Since its primary usage is for captions, this should be the language of the captions.
	 * @default 'English'
	 */
	label?: string
	/**
	 * Language of the track text data. Must be a valid BCP 47 language tag.
	 * @default 'en'
	 * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track#srclang
	 */
	srcLang?: string
	/**
	 * Audio file, or the path to the audio file to transcribe.
	 * @note transcription can only be done with audio files.
	 */
	src?: ArrayBuffer | string
	/**
	 * A function that allows for transforming the cues before they are added to the track.
	 */
	transform?: (cues: Cue[]) => Cue[]
}

/**
 * Creates vtt caption text from an audio file.
 */
export async function caption(
	/**
	 * Audio file, or the path to the audio file to transcribe.
	 */
	src?: ArrayBuffer | string,
	options?: Pick<
		TrackProps,
		| 'kind'
		| 'type'
		| 'media'
		| 'name'
		| 'model'
		| 'language'
		| 'prompt'
		| 'transform'
	>
) {
	const {
		transform,
		kind,
		type = 'audio/mpeg',
		media = 'audio',
		model = 'whisper-1',
		language = 'en',
		prompt,
		name,
	} = options || {}
	let content: fs.ReadStream | FileLike | undefined

	try {
		content = getApiFile(src, type, name)
	} catch {
		return ''
	}

	if (!content) {
		return ''
	}

	const { responseText } = await getAudio({
		mode: 'transcription',
		prompt: prompt ?? `vtt ${kind} for this ${media} file`,
		content,
		model,
		language,
		// eslint-disable-next-line @typescript-eslint/naming-convention
		response_format: 'vtt',
	})

	let vttText = responseText

	if (transform) {
		vttText = transformVTT(responseText, transform)
	}

	/**
	 * @consideration return a stream instead of a string
	 */
	return toBase64Url(vttText, 'text/vtt')
}

/**
 * Track generates captions from an audio file to be used in <audio> or <video>.
 * It lets you specify timed text tracks, for example to automatically handle subtitles.
 * The track is formatted in WebVTT format (.vtt files) — Web Video Text Tracks.
 * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track
 */
export async function Track(
	/**
	 * @link TrackProps
	 */
	props: TrackProps
) {
	const {
		transform,
		kind = 'captions',
		type,
		media,
		name,
		model,
		prompt,
		language,
		src: file,
		...rest
	} = props || {}
	const src = await caption(file, {
		transform,
		kind,
		type,
		media,
		name,
		model,
		language,
		prompt,
	})

	return <track src={src} kind={kind} label="English" srcLang="en" {...rest} />
}
