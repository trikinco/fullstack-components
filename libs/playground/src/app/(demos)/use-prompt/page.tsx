'use client'

import { usePrompt } from '@fullstack-components/ai-components/client'

export default function Page() {
	const { isLoading, data } = usePrompt(
		'What is the longest river in the world?'
	)

	return (
		<div className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1 className="text-3xl mb-6">
				<code>usePrompt</code> demo
			</h1>

			<div className="bg-white/10 mb-4 block p-4 rounded-md border-2 border-white/50">
				<code className="mb-3 block">Code</code>
				<code className="prose dark:prose-invert">
					usePrompt(&quot;What is the longest river in the world?&quot;)
				</code>
			</div>

			{isLoading ? 'Loading prompt...' : null}

			{data ? <div className="max-w-prose md:min-w-[65ch]">{data}</div> : null}
		</div>
	)
}
