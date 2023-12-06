'use client'

import { useImage } from '../../../../../fullstack-components/dist/client'

export default function Page() {
	const { isLoading, isError, data } = useImage({
		prompt: 'A friendly smiling robot',
	})

	if (isLoading) {
		return 'Generating image...'
	}

	if (isError) {
		return 'Could not generate image'
	}

	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img src={data} alt="A friendly smiling robot" width="256" height="256" />
	)
}
