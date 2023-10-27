'use client'
import { useRequest } from '@fullstack-components/ai-components/client'

export default function Image() {
	const imageURL =
		'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Felis_catus-cat_on_snow.jpg/179px-Felis_catus-cat_on_snow.jpg'

	const { data, isLoading } = useRequest<{ result: string }>('/api/image', {
		body: { imageURL },
	})

	if (isLoading && !data) {
		return 'Loading image description...'
	}

	return (
		<div className="p-6">
			<p>Image</p>

			{data ? <img src={imageURL} alt={data.result} /> : null}
			<p>{data?.result}</p>
		</div>
	)
}
