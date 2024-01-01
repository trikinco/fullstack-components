import type {
	AudioSpeechModeRequestBody,
	AudioTranscriptionModeRequestBody,
	AudioTranslationModeRequestBody,
} from '../../types/audio'

export type AudioRequestBody =
	| AudioSpeechModeRequestBody
	| AudioTranscriptionModeRequestBody
	| AudioTranslationModeRequestBody

export type AudioOptions = {
	/**
	 * @default `process.env.OPENAI_API_KEY`.
	 */
	openAiApiKey?: string
}

export class AudioError extends Error {
	public rootCause: string

	constructor(error: any) {
		super('Error running audio')
		this.name = 'AudioError'
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.rootCause = error.message
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.stack = error.stack
	}
}
