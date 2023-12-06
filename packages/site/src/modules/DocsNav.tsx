'use client'
import type { ReactNode, HTMLAttributes } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { merge } from '../../../fullstack-components/dist/utils'
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
				className="focus:mb-6 rounded-sm focus-ring"
			>
				Skip to the main content
			</SkipLink>
			<ul className="flex flex-col gap-2">
				{routesMeta.map(({ title, href, isTitle }) => {
					const isCurrentPage = pathname === href

					return (
						<li
							key={href}
							className={merge(
								'flex',
								isCurrentPage &&
									'text-blue-600 dark:text-blue-400 font-bold before:content-["·"] before:mr-2'
							)}
						>
							<Link
								id={isTitle ? ID_DOCS_NAV : undefined}
								href={href}
								className={merge(
									'w-full rounded-sm focus-ring hover:text-black focus-visible:text-black dark:hover:text-white hover:underline',
									isCurrentPage
										? 'text-blue-600 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-400 font-bold'
										: 'text-black/60 dark:text-white/60',
									isTitle && 'text-black dark:text-white font-bold text-lg mb-3'
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
