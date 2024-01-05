'use client'
import type { ReactNode, HTMLAttributes } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { URL_HOST, merge } from '@trikinco/fullstack-components/utils'
import { routesMeta } from '@/src/utils/routes'
import { JsonSchema } from '@/src/modules/JsonSchema'
import { IconChevronLeft } from '@/src/components/Icons/IconChevronLeft'

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
	children?: ReactNode
}

/**
 * Breadcrumbs can help a user find their current location within the overal hierarchy.
 * Includes JSON-LD schema.org metadata for SEO.
 */
export function Breadcrumbs({ children, className }: BreadcrumbsProps) {
	const pathname = usePathname()
	const crumbs = pathname
		.split('/')
		.filter(Boolean)
		.map((_crumb, index, crumbs) => {
			const href = `/${crumbs.slice(0, index + 1).join('/')}`
			const meta = routesMeta.find((route) => route.href === href)
			return meta
		})
		.filter(Boolean)

	return (
		<>
			<JsonSchema
				type="BreadcrumbList"
				numberOfItems={crumbs?.length}
				itemListElement={crumbs?.map((crumb, index) => ({
					'@type': 'ListItem',
					position: index + 1,
					item: {
						'@id': `${new URL(crumb?.href || '', URL_HOST)}`,
						name: crumb?.title,
					},
				}))}
			/>
			<nav
				className={merge('lg:hidden print:hidden', className)}
				aria-label="Breadcrumb"
			>
				<ol className="flex gap-2 max-w-prose mx-auto">
					<li className="text-sm text-slate-600 dark:text-slate-400">
						<Link href="/">Home</Link>
					</li>
					{crumbs?.map((crumb) => {
						const isCurrentPage = crumb?.href === pathname
						return (
							<li
								key={crumb?.href}
								className={merge(
									'text-sm inline-flex flex-wrap items-center gap-2',
									isCurrentPage
										? 'font-bold'
										: 'text-slate-600 dark:text-slate-400'
								)}
							>
								<IconChevronLeft
									width={16}
									height={16}
									aria-hidden="true"
									className="w-4 h-4 rotate-180"
								/>
								<Link
									href={crumb?.href || ''}
									aria-current={isCurrentPage ? 'page' : undefined}
								>
									{crumb?.title}
								</Link>
							</li>
						)
					})}
					{children}
				</ol>
			</nav>
		</>
	)
}

export default Breadcrumbs
