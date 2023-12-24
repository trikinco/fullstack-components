import type OpenAI from 'openai'

/**
 * Depending on the `mode`, `speech` generates audio files from text or `transcriptions` and `translations` generates text from audio.
 */
export type AudioMode = 'speech' | 'transcription' | 'translation'

export interface AudioSpeechModeRequestBody
	extends Omit<
		OpenAI.Audio.Speech.SpeechCreateParams,
		'model' | 'voice' | 'input'
	> {
	/**
	 * Speech mode generates audio files from text.
	 */
	mode: 'speech'
	/**
	 * ID of the model to use.
	 * See the model endpoint compatibility table for details on which models work with the Audio API.
	 * @default 'tts-1-hd' speech model optimized for quality.
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
	 * A text string to generate an audio file from.
	 */
	content: string
}

export interface AudioTranscriptionModeRequestBody
	extends Omit<
		OpenAI.Audio.Transcriptions.TranscriptionCreateParams,
		'model' | 'file' | 'language'
	> {
	/**
	 * Transcription mode generates text from audio.
	 */
	mode: 'transcription'
	/**
	 * ID of the model to use.
	 * See the model endpoint compatibility table for details on which models work with the Audio API.
	 * @default 'whisper-1'
	 * @link https://platform.openai.com/docs/models/model-endpoint-compatibility
	 */
	model?: OpenAI.Audio.Transcriptions.TranscriptionCreateParams['model']
	/**
	 * The language of the input audio. Supplying the input language in ISO-639-1 format will improve accuracy and latency.
	 * @default 'en' English.
	 */
	language?: OpenAI.Audio.Transcriptions.TranscriptionCreateParams['language']
	/**
	 * An audio file to transcribe.
	 */
	content: OpenAI.Audio.Transcriptions.TranscriptionCreateParams['file']
}

export interface AudioTranslationModeRequestBody
	extends Omit<
		OpenAI.Audio.Translations.TranslationCreateParams,
		'model' | 'file'
	> {
	/**
	 * Translation mode translates audio files to English.
	 */
	mode: 'translation'
	/**
	 * ID of the model to use.
	 * See the model endpoint compatibility table for details on which models work with the Audio API.
	 * @default 'whisper-1'
	 * @link https://platform.openai.com/docs/models/model-endpoint-compatibility
	 */
	model?: OpenAI.Audio.Translations.TranslationCreateParams['model']
	/**
	 * An audio file to translate.
	 */
	content: OpenAI.Audio.Translations.TranslationCreateParams['file']
}
