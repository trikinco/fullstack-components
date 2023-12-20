'use client'

import { usePrompt } from '@trikinco/fullstack-components/client'

export default function Page() {
	const { isLoading, data } = usePrompt({
		prompt: 'What is the longest river in the world?',
		format: 'JSON',
	})

	if (isLoading) {
		return 'Loading...'
	}

	return <div className="max-w-prose">{JSON.stringify(data)}</div>
}
