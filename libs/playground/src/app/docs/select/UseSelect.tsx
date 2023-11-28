'use client'

import { useSelect } from '@trikinco/fullstack-components/client'

export default function Page() {
	const { isLoading, isError, data } = useSelect({
		prompt:
			'The nearest countries to Australia. Include a flag emoji in the label.',
		count: 10,
	})

	if (isLoading) {
		return 'Loading "The 10 nearest countries to Australia"'
	}

	if (isError) {
		return 'Could not load "The 10 nearest countries to Australia"'
	}

	return (
		<>
			<p className="font-bold mt-0">{data?.label}</p>
			<ul className="mb-0">
				{data?.content?.map((item) => <li key={item.value}>{item.label}</li>)}
			</ul>
		</>
	)
}
