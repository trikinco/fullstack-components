'use client'
import type { ReactNode, HTMLAttributes } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { merge } from '@trikinco/fullstack-components/utils'
import { routesDocsMeta } from '@/src/utils/routes'

export interface DocsFooterProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
}

const linkStyles =
	'font-bold rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-100 dark:focus-visible:ring-offset-slate-950 hover:text-white focus-visible:text-white text-sky-500 hover:text-sky-600 focus-visible:text-sky-600'

/**
 * Docs footer navigation
 */
export default function DocsFooter({ children, className }: DocsFooterProps) {
	const pathname = usePathname()
	const current = routesDocsMeta.findIndex((item) => item.href === pathname)
	const prevItem = routesDocsMeta?.[current - 1]
	const nextItem = routesDocsMeta?.[current + 1]

	return (
		<footer className={merge('flex gap-6 justify-between py-6', className)}>
			{children}

			{prevItem && (
				<Link className={merge('mr-auto', linkStyles)} href={prevItem.href}>
					&lsaquo; {prevItem.title}
				</Link>
			)}

			{nextItem && (
				<Link className={merge('ml-auto', linkStyles)} href={nextItem.href}>
					{nextItem.title} &rsaquo;
				</Link>
			)}
		</footer>
	)
}
