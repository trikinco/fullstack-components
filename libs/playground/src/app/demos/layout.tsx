import type { ReactNode } from 'react'
import Main from '@/src/components/Main'
import Prose from '@/src/components/Prose'

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<Main className="items-start lg:justify-center lg:mx-auto lg:max-w-screen-2xl lg:grid lg:grid-rows-none lg:grid-cols-12">
				<Prose className="col-span-full md:col-start-3 md:col-end-12">
					{children}
				</Prose>
			</Main>
		</>
	)
}
