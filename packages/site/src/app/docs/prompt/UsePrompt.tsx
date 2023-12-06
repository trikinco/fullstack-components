'use client'

import { usePrompt } from '../../../../../fullstack-components/dist/client'

export default function Page() {
	const { isLoading, data } = usePrompt({
		prompt: 'What is the longest river in the world?',
	})

	if (isLoading) {
		return 'Loading...'
	}

	return <div className="max-w-prose">{data}</div>
}
