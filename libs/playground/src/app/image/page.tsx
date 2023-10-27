'use client'
import { useRequest } from '@fullstack-components/ai-components/client'

export default function Image() {
	const imageURL =
		'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Felis_catus-cat_on_snow.jpg/179px-Felis_catus-cat_on_snow.jpg'

	const { data, isLoading } = useRequest<{ result: string }>(
		'/api/image/describe',
		{
			body: { imageURL },
		}
	)

	const { data: image, isLoading: isImageLoading } = useRequest<{
		result: string
	}>('/api/image/create', {
		body: { prompt: 'A horse in outer space' },
	})

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1 className="text-3xl mb-6">
				<code>Image</code> demo
			</h1>

			<div>
				{isLoading && !data ? (
					'Loading image description...'
				) : (
					<div className="flex flex-col items-center">
						<h2 className="text-2xl mb-6">Image description</h2>

						{data ? (
							<img
								className="mb-3"
								src={imageURL}
								alt={data.result}
								width={256}
							/>
						) : null}

						<div className="bg-white/10 mb-4 block p-4 rounded-md border-2 border-white/50">
							<code className="prose dark:prose-invert">
								&lt;img alt=&quot;{data?.result}&quot; src=&quot;...&quot; /&gt;
							</code>
						</div>
					</div>
				)}
			</div>

			<div>
				{isImageLoading && !image ? (
					'Generating image...'
				) : (
					<div className="flex flex-col items-center">
						<h2 className="text-2xl mb-6">Image generation</h2>

						<p className="mb-3">A horse in outer space</p>
						{image ? <img src={image.result} alt="" /> : null}
					</div>
				)}
			</div>
		</main>
	)
}
