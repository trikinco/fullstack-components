import { getPrompt } from '@trikinco/fullstack-components'

export default async function Page() {
	const response = await getPrompt({
		prompt: 'Tell me about TailwindCSS',
	})

	return <div>{response}</div>
}
