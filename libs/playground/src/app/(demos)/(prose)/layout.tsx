import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<main className="flex flex-col items-center justify-between p-6 md:p-24 min-h-screen">
			<div className="prose w-full dark:prose-invert prose-h1:text-5xl prose-h1:font-bold prose-h1:mb-3 mx-auto">
				{children}
			</div>
		</main>
	)
}
