'use client'

import { usePrompt } from '@trikinco/fullstack-components/client'

export default function Page() {
	// Optional, type variable to infer the right type for `data`
	const { isLoading, data } = usePrompt<{ rivers: string[] }>({
		// Required, JSON mode
		format: 'JSON',
		prompt: `
    What are the 5 longest rivers in the world?
    Return JSON in the format: {"rivers": string[]} 
    `, // 👆 Specifying the schema in the prompt is required
		// You can play around with the wording
	})

	if (isLoading) {
		return 'Loading...'
	}

	return <ol>{data?.rivers.map((river) => <li key={river}>{river}</li>)}</ol>
}
