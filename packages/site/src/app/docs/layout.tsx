import type { ReactNode } from 'react'
import Main from '@/src/components/Main'
import Prose from '@/src/components/Prose'
import Breadcrumbs from '@/src/modules/Breadcrumbs'
import DocsNav from '@/src/modules/DocsNav'
import DocsToc from '@/src/modules/DocsToc'
import { ID_MAIN } from '@/src/utils/constants'
import DocsFooter from '@/src/modules/DocsFooter'
import { routesDocs } from '@/src/utils/routes'
import { getTocMarkupByRoutes } from '@/src/utils/getTocMarkupByRoutes'

export default async function Layout({ children }: { children: ReactNode }) {
	// Prebuild TOC markup for each docs page
	const tocMarkupByRoutes = await getTocMarkupByRoutes(routesDocs)

	return (
		<>
			<Main
				as="div"
				id="content"
				className="items-start lg:justify-center lg:mx-auto lg:max-w-screen-2xl lg:grid lg:grid-rows-none lg:grid-cols-12"
			>
				<DocsNav className="row-start-1 row-end-3 hidden lg:sticky lg:top-32 lg:left-0 lg:flex w-full max-w-prose mx-auto lg:mx-0 lg:col-start-1 lg:col-end-3" />
				<Breadcrumbs className="row-start-1 py-3 md:py-0 lg:mb-2 w-full max-w-prose mx-auto col-span-full md:col-start-3 md:col-end-11" />
				<Prose
					as="main"
					id={ID_MAIN}
					className="row-start-2 col-span-full md:col-start-3 md:col-end-11"
				>
					{children}
				</Prose>
				<DocsToc
					className="row-start-1 row-end-3 hidden lg:sticky lg:top-32 lg:right-0 lg:flex w-full max-w-prose mx-auto lg:mx-0 lg:col-start-11 lg:col-span-2"
					tocMarkupByRoutes={tocMarkupByRoutes}
				/>
				<DocsFooter className="w-full lg:w-auto col-span-full md:col-start-3 md:col-end-11" />
			</Main>
		</>
	)
}
