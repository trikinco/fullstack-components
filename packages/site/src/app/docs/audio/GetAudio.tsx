import { getAudio } from '@trikinco/fullstack-components'

export default async function Page() {
	const { responseFile, contentType } = await getAudio({
		mode: 'speech',
		content: 'It is Wednesday my dudes',
		voice: 'onyx',
	})

	const base64String = Buffer.from(responseFile).toString('base64')

	if (!base64String) return 'No reminders.'

	return (
		<a href={`data:${contentType};base64,${base64String}`} download>
			Download reminder
		</a>
	)
}
