import type { ReactNode } from 'react'
import Prose from '@/src/components/Prose'

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<main className="flex flex-col items-center justify-between p-6 md:p-24 min-h-screen">
			<Prose>{children}</Prose>
		</main>
	)
}
