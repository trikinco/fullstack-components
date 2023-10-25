import { Select } from '@/src/components/Select'

export default function Page() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1 className="text-3xl mb-6">
				<code>Select</code> demo
			</h1>

			<div className="bg-white/10 mb-4 block p-4 rounded-md border-2 border-white/50">
				<code className="mb-3 block">Code</code>
				<code className="prose dark:prose-invert">
					&lt;Select purpose=&quot;selecting a timezone&quot; context=&quot;our
					users are in Sydney&quot; /&gt;
				</code>
			</div>

			<div className="max-w-prose md:min-w-[65ch]">
				<Select
					purpose="selecting a timezone"
					context="our users are in Sydney"
				/>
			</div>
		</main>
	)
}
