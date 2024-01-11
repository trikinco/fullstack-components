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
				className="focus:mb-6 rounded-sm focus-ring"
			>
				Skip to the main content
			</SkipLink>
			<ul className="flex flex-col gap-2 break-words">
				{routesMeta.map(({ title, href, isTitle, icon, hasDivider }) => {
					const isCurrentPage = pathname === href

					return (
						<li key={href}>
							<span
								className={merge(
									'flex',
									isCurrentPage && 'text-blue-600 dark:text-blue-400 font-bold',
									!icon && isCurrentPage && 'before:content-["·"] before:mr-2',
									hasDivider &&
										'mb-3 pb-4 border-b border-slate-200 dark:border-slate-800'
								)}
							>
								<Link
									id={isTitle ? ID_DOCS_NAV : undefined}
									href={href}
									className={merge(
										'w-full rounded-sm',
										'flex flex-wrap gap-2 items-center',
										'focus-ring hover:text-black focus-visible:text-black dark:focus-visible:text-white dark:hover:text-white hover:underline',
										isCurrentPage
											? 'text-blue-600 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-400 font-bold'
											: 'text-black/60 dark:text-white/60',
										isTitle &&
											'text-black dark:text-white font-bold text-lg mb-3'
									)}
									aria-current={isCurrentPage ? 'page' : undefined}
								>
									{icon}
									{title}
								</Link>
							</span>
						</li>
					)
				})}
			</ul>
			{children}
		</nav>
	)
}
