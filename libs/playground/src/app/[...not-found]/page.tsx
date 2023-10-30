import Link from 'next/link'
import { NotFoundEnhancer } from '@/src/components/NotFoundEnhancer'
import { PageHeader } from '@/src/components/PageHeader'

export default function NotFound() {
	return (
		<main className="flex flex-col items-center justify-between p-24 min-h-screen">
			<div className="prose dark:prose-invert mx-auto">
				<PageHeader title="Not Found" />
				<p>Could not find requested resource</p>
				<Link
					className="mt-3 bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg inline-flex no-underline items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
					href="/"
				>
					Return Home
				</Link>

				<NotFoundEnhancer />
			</div>
		</main>
	)
}
