'use client'
import type { ReactNode, HTMLAttributes } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { merge } from '../../../fullstack-components/dist/utils'
import { routesDocsMeta } from '@/src/utils/routes'

export interface DocsFooterProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
}

const linkStyles =
	'font-bold rounded-sm focus-ring text-blue-600 dark:text-blue-400 hover:underline'

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
