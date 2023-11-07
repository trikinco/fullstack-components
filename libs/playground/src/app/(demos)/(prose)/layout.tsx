import type { ReactNode } from 'react'

/**
 * Temporary workaround for `fetch failed` `undici`
 * @see https://github.com/vercel/next.js/issues/44062
 *
 * Force dynamic rendering and uncached data fetching of a layout or page
 * by disabling all caching of fetch requests and always revalidating.
 */
export const dynamic = 'force-dynamic'

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<main className="flex flex-col items-center justify-between p-6 md:p-24 min-h-screen">
			<div className="prose dark:prose-invert mx-auto">{children}</div>
		</main>
	)
}
