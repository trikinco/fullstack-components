'use client'

import { useBlock } from '@trikinco/fullstack-components/client'

export default function Page() {
	const { id } = useBlock('A spinning button')

	return <div id={id}>Generating a button...</div>
}
