import type { ReactNode } from 'react'
import Main from '@/src/components/Main'

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<Main>
			<div className="w-full max-w-screen-2xl mx-auto">{children}</div>
		</Main>
	)
}
