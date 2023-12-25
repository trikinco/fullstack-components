'use client'

import { useAudio } from '@trikinco/fullstack-components/client'

export default function Page() {
	const { play, pause, setPlayBackRate, isLoading, data, audioRef } = useAudio({
		mode: 'speech',
		content:
			"Hey there, what's up? I'm working on a project called Fullstack Components. It's a set of tools for Next.js that can be used to build fullstack applications powered by AI.",
	})

	if (isLoading) {
		return 'Loading...'
	}

	return (
		<div>
			<audio ref={audioRef} controls>
				<source src={data} type="audio/mpeg" />
			</audio>
			<div className="flex gap-3">
				<button onClick={() => play()}>Play</button>
				<button onClick={() => pause()}>Pause</button>
				<button onClick={() => setPlayBackRate(0.5)}>0.5x</button>
				<button onClick={() => setPlayBackRate(1)}>1.0x</button>
				<button onClick={() => setPlayBackRate(2)}>2.0x</button>
			</div>
		</div>
	)
}
