'use client'

import { useImage } from '@trikinco/fullstack-components/client'

export default function Page() {
	const { isLoading, isError, data } = useImage({
		prompt: 'A friendly smiling robot',
		n: 2,
	})

	if (isLoading) {
		return 'Generating images...'
	}

	if (isError) {
		return 'Could not generate images'
	}

	return data?.map((url) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			key={url}
			src={url}
			alt="A friendly smiling robot"
			width="256"
			height="256"
		/>
	))
}
