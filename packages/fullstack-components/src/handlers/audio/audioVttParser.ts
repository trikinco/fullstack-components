/* eslint-disable @typescript-eslint/naming-convention */
export interface Cue {
	/**
	 * A name that identifies the cue.
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API#cue_identifier
	 */
	id: string
	/**
	 * The start time of the cue.
	 * @example 00:00:00.000
	 */
	start: string
	/**
	 * The end time of the cue.
	 * @example 00:00:02.200
	 */
	end: string
	/**
	 * The cue text
	 */
	text: string[]
	/**
	 * Cue settings are optional components used to position where the cue payload text will be displayed over the video.
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API#cue_settings
	 */
	settings: string
}

function parseVTT(vttString: string): Cue[] {
	const lines = vttString.split('\n')
	const cues: Cue[] = []
	let currentCue: Cue = { id: '', start: '', end: '', text: [], settings: '' }
	let isCue = false

	for (const line of lines) {
		if (line.trim() === 'WEBVTT') {
			continue
		}

		if (line.trim() === '' && isCue) {
			cues.push({ ...currentCue })
			currentCue = { id: '', start: '', end: '', text: [], settings: '' }
			isCue = false
			continue
		}

		// Timecode
		if (line.includes('-->')) {
			isCue = true
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const [start, _delimiter, end, ...settingsParts] = line.split(' ')

			currentCue.start = start.trim()
			currentCue.end = end.trim()
			currentCue.settings = settingsParts.join(' ').trim()
		} else if (isCue) {
			currentCue.text.push(line)
		}
	}

	// Push the last cue if it exists and hasn't been pushed yet
	if (isCue) {
		cues.push(currentCue)
	}

	return cues
}

function constructVTT(cues: Cue[]): string {
	let vttString = 'WEBVTT\n\n'

	for (const cue of cues) {
		vttString += `${cue.id}\n${cue.start} --> ${cue.end} ${
			cue.settings
		}\n${cue.text.join('\n')}\n\n`
	}

	return vttString.trim()
}

export function transformVTT(
	vttString: string,
	transform: (cues: Cue[]) => Cue[]
): string {
	const cues = parseVTT(vttString)
	const modifiedCues = transform(cues)

	return constructVTT(modifiedCues)
}
