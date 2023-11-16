'use client'

import { PageHeader } from '@/src/components/PageHeader'
import { usePrompt } from '@trikinco/fullstack-components/client'

export default function Page() {
	const { isLoading, data } = usePrompt(
		'What is the longest river in the world?'
	)

	return (
		<>
			<PageHeader title="usePrompt" />

			<div className="bg-white/10 mb-4 block p-4 rounded-md border-2 border-white/50">
				<code className="mb-3 block">Code</code>
				<code className="prose dark:prose-invert">
					usePrompt(&quot;What is the longest river in the world?&quot;)
				</code>
			</div>

			{isLoading ? 'Loading prompt...' : null}

			{data ? <div className="max-w-prose md:min-w-[65ch]">{data}</div> : null}
		</>
	)
}
