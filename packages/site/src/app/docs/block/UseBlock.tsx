'use client'

import { useBlock } from '../../../../../fullstack-components/dist/client'

export default function Page() {
	const { id } = useBlock('A spinning button')

	return <div id={id}>Generating a button...</div>
}
