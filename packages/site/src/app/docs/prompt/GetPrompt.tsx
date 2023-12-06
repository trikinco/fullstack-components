import { getPrompt } from '@trikinco/fullstack-components'

export default async function Page() {
	const { responseText } = await getPrompt({
		prompt: 'Tell me about TailwindCSS',
	})

	return <div>{responseText}</div>
}
