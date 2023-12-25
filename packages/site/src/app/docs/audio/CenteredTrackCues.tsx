import { Track, type Cue } from '@trikinco/fullstack-components'

export default function CenteredTrackCues() {
	const modifyCues = (cues: Cue[]): Cue[] => {
		return cues.map((cue) => {
			cue.settings = 'line:50%'
			return cue
		})
	}

	return (
		<video controls className="aspect-video w-full [&::cue]:text-base">
			<source src="/assets/audio-speech.mp3#t=0.1" type="audio/mpeg" />
			<Track src="/assets/audio-speech.mp3" transform={modifyCues} default />
		</video>
	)
}
