import { Text } from '@trikinco/fullstack-components'

export default function Page() {
	return (
		<>
			<h2>Ominous</h2>
			<Text tone="Ominous" type="HTML" as="div" className="mb-3">
				Welcome to fullstack components
			</Text>

			<h2>Energetic and positive</h2>
			<Text tone="Energetic and positive" type="HTML" as="div" className="mb-3">
				Welcome to fullstack components
			</Text>

			<h2>Silly</h2>
			<Text tone="Silly" type="HTML" as="div" className="mb-3">
				Welcome to fullstack components
			</Text>
		</>
	)
}
