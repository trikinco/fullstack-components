import { getAudio } from '@trikinco/fullstack-components'

export default async function Page() {
	const { responseFile, contentType } = await getAudio({
		mode: 'speech',
		content: 'It is Wednesday my dudes',
		voice: 'onyx',
	})

	if (!responseFile) return 'No reminders.'

	const base64String = Buffer.from(responseFile).toString('base64')

	return (
		<a href={`data:${contentType};base64,${base64String}`} download>
			Download reminder
		</a>
	)
}
