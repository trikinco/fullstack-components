'use client'
import type { ReactNode, HTMLAttributes } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { merge } from '@trikinco/fullstack-components/utils'
import SkipLink from '@/src/components/SkipLink'
import { routesMeta } from '@/src/utils/routes'
import { ID_DOCS_NAV, ID_MAIN } from '@/src/utils/constants'

export interface DocsNavProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
}

/**
 * Docs sidebar navigation
 */
export default function DocsNav({ children, className }: DocsNavProps) {
	const pathname = usePathname()

	return (
		<nav
			className={merge('flex flex-col relative', className)}
			aria-labelledby={ID_DOCS_NAV}
		>
			<SkipLink
				href={`#${ID_MAIN}`}
				className="focus:mb-6 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-100 dark:focus-visible:ring-offset-slate-950"
			>
				Skip to the main content
			</SkipLink>
			<ul className="flex flex-col gap-2">
				{routesMeta.map(({ title, href, isTitle }) => {
					const isCurrentPage = pathname === href

					return (
						<li key={href} className="flex">
							<Link
								id={isTitle ? ID_DOCS_NAV : undefined}
								href={href}
								className={merge(
									'w-full rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-100 dark:focus-visible:ring-offset-slate-950 hover:text-white focus-visible:text-white',
									isCurrentPage
										? 'text-sky-500 hover:text-sky-600 focus-visible:text-sky-600 font-bold before:content-["·"] before:mr-2'
										: 'text-white/60',
									isTitle && 'text-white font-bold text-lg mb-3'
								)}
								aria-current={isCurrentPage ? 'page' : undefined}
							>
								{title}
							</Link>
						</li>
					)
				})}
			</ul>
			{children}
		</nav>
	)
}
