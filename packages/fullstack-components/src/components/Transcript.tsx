import type OpenAI from 'openai'
import type { FileLike } from 'openai/uploads'
import type { ElementType, HTMLAttributes } from 'react'
import type { AsComponent } from '../types'
import type { ReadStream } from 'fs'
import { getAudio } from '../handlers/audio/audioClient'
import { getApiFile } from '../utils/getApiFile'

/**
 * Props to pass to the `<Transcript>` Server Component.
 * @link AudioTranscriptionModeRequestBody
 */
export interface TranscriptProps extends HTMLAttributes<HTMLElement> {
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
	 * @link https://platform.openai.com/docs/guides/speech-to-text/prompting
	 */
	prompt?: OpenAI.Audio.Transcriptions.TranscriptionCreateParams['prompt']
	/**
	 * Audio file, or the path to the audio file to transcribe.
	 * @note transcription can only be done with audio files.
	 */
	src?: ArrayBuffer | string
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
	 * The `response_format` of the transcript output. Use `vtt` for WebVTT / captions format.
	 * @default 'json'
	 */
	format?: 'json' | 'text' | 'srt' | 'verbose_json' | 'vtt'
}

const defaultElement = 'div'

export async function transcribe(
	/**
	 * Audio file, or the path to the audio file to transcribe.
	 */
	src?: ArrayBuffer | string,
	options?: Pick<
		TranscriptProps,
		'format' | 'type' | 'name' | 'model' | 'language' | 'prompt'
	>
) {
	const {
		type = 'audio/mpeg',
		format = 'json',
		model = 'whisper-1',
		language = 'en',
		prompt,
		name,
	} = options || {}
	let content: ReadStream | FileLike | undefined

	try {
		content = getApiFile(src, type, name)
	} catch {
		return 'Error: Failed to load file to transcribe.'
	}

	if (!content) {
		return 'Error: No file to transcribe.'
	}

	const { responseText } = await getAudio({
		mode: 'transcription',
		content,
		model,
		language,
		prompt,
		// eslint-disable-next-line @typescript-eslint/naming-convention
		response_format: format,
	})

	if (!responseText) {
		return 'No transcript available.'
	}

	return responseText
}

/**
 * Generates text from an audio file.
 */
export async function Transcript<C extends ElementType = typeof defaultElement>(
	/**
	 * @link TranscriptProps
	 */
	props: AsComponent<C, TranscriptProps>
) {
	const {
		children,
		as,
		src,
		format,
		type,
		name,
		model,
		language,
		prompt,
		...rest
	} = props || {}
	const text = await transcribe(src, {
		format,
		type,
		name,
		model,
		language,
		prompt,
	})

	if (as) {
		const Component = as as 'div' | C
		return (
			<Component {...rest}>
				{children}
				{text}
			</Component>
		)
	}

	return (
		<>
			{children}
			{text}
		</>
	)
}
