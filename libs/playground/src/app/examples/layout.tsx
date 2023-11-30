import type { ReactNode } from 'react'
import Main from '@/src/components/Main'
import Prose from '@/src/components/Prose'
import DocsNav from '@/src/modules/DocsNav'
import { ID_MAIN } from '@/src/utils/constants'
import DocsFooter from '@/src/modules/DocsFooter'

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<Main
			as="div"
			id="content"
			className="items-start lg:justify-center lg:mx-auto lg:max-w-screen-2xl lg:grid lg:grid-rows-none lg:grid-cols-12"
		>
			<DocsNav className="hidden lg:sticky lg:top-32 lg:left-0 lg:flex w-full max-w-prose mx-auto lg:mx-0 lg:col-start-1 lg:col-end-3" />
			<Prose
				as="main"
				id={ID_MAIN}
				className="col-span-full md:col-start-3 md:col-end-12"
			>
				{children}
			</Prose>
			<DocsFooter className="w-full lg:w-auto col-span-full md:col-start-3 md:col-end-12" />
		</Main>
	)
}
