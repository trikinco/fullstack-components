'use client'

import { PageHeader } from '@/src/components/PageHeader'
import { useUi } from '@/src/hooks/useUi'
import { GenerativeUI } from '@/src/modules/GenerativeUI'

const prompt = 'an FAQ accordion'

export default function Page() {
	const { fetchUi, content, isLoading, isError } = useUi(prompt)

	return (
		<>
			<PageHeader
				className="max-w-prose mx-auto text-center"
				title="Generative UI"
			/>

			<GenerativeUI
				refetch={() => fetchUi(prompt)}
				prompt={prompt}
				content={content}
				isLoading={isLoading}
				isError={isError}
			/>
		</>
	)
}
