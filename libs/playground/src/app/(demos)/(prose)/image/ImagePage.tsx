'use client'
import Image from 'next/image'
import { useRequest } from '@fullstack-components/ai-components/client'
import { PageHeader } from '@/src/components/PageHeader'

const imageURL =
	'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Felis_catus-cat_on_snow.jpg/179px-Felis_catus-cat_on_snow.jpg'
const prompt = 'A horse in outer space'

export default function ImagePage() {
	const { data, isLoading } = useRequest<{ result: string }>(
		'/api/image/describe',
		{
			body: { imageURL },
		}
	)

	const { data: image, isLoading: isImageLoading } = useRequest<{
		result: string
	}>('/api/image/create', {
		body: { prompt },
	})

	return (
		<>
			<PageHeader title="Image" />

			<div>
				{isLoading && !data ? (
					'Loading image description...'
				) : (
					<div className="flex flex-col items-center">
						<h2 className="text-2xl mb-6">Image description</h2>

						{data ? (
							<Image
								className="mb-3"
								src={imageURL}
								alt={data.result}
								width={256}
								height={170}
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

						<p className="mb-3">{prompt}</p>
						{image ? (
							<Image src={image.result} alt={prompt} width={256} height={256} />
						) : null}
					</div>
				)}
			</div>
		</>
	)
}
