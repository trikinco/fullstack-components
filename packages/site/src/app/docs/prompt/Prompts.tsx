import { Prompt } from '@trikinco/fullstack-components'

export default async function Page() {
	return (
		<div>
			<Prompt prompt="What is TailwindCSS?" />
			<Prompt
				messages={[
					{
						role: 'system',
						content:
							'You translate Norwegian to English. You return the translated text directly',
					},
					{
						role: 'user',
						content: 'Reven rasker over isen',
					},
				]}
			/>
		</div>
	)
}
