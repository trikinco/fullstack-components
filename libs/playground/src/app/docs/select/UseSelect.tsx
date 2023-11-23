'use client'

import { useSelect } from '@trikinco/fullstack-components/client'

export default function Page() {
	const { isLoading, isError, data } = useSelect({
		prompt:
			'The 10 nearest countries to Australia. Include a flag emoji in the label.',
	})

	if (isLoading) {
		return 'Loading "The 10 nearest countries to Australia"'
	}

	if (isError) {
		return 'Could not load "The 10 nearest countries to Australia"'
	}

	return (
		<>
			<p className="font-bold">{data?.label}</p>
			<ul>
				{data?.content?.map((item) => <li key={item.value}>{item.label}</li>)}
			</ul>
		</>
	)
}
