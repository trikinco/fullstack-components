'use client'

import { useImage } from '@trikinco/fullstack-components/client'

export default function Page() {
	const { isLoading, isError, data } = useImage({
		src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Felis_catus-cat_on_snow.jpg/179px-Felis_catus-cat_on_snow.jpg',
	})

	if (isLoading) {
		return 'Describing image..."'
	}

	if (isError) {
		return 'Could not describe image'
	}

	return (
		<div className="rounded-md overflow-hidden p-6 bg-sky-200 text-sky-800 text-xl">
			{data}
		</div>
	)
}
