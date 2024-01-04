'use client'
import type { ReactNode, HTMLAttributes } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { merge } from '@trikinco/fullstack-components/utils'
import { routesDocsMeta } from '@/src/utils/routes'
import { IconChevronLeft } from '../components/Icons/IconChevronLeft'

export interface DocsFooterProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
}

const linkStyles =
	'inline-flex items-center gap-1 font-bold rounded-sm focus-ring text-blue-600 dark:text-blue-400 hover:underline'

/**
 * Docs footer navigation
 */
export default function DocsFooter({ children, className }: DocsFooterProps) {
	const pathname = usePathname()
	const current = routesDocsMeta.findIndex((item) => item.href === pathname)
	const prevItem = routesDocsMeta?.[current - 1]
	const nextItem = routesDocsMeta?.[current + 1]

	return (
		<footer
			className={merge(
				'flex gap-6 justify-between py-6 print:hidden',
				className
			)}
		>
			<div className="w-full max-w-prose mx-auto flex flex-wrap">
				{children}

				{prevItem && (
					<Link className={merge('mr-auto', linkStyles)} href={prevItem.href}>
						<IconChevronLeft width={20} height={20} /> {prevItem.title}
					</Link>
				)}

				{nextItem && (
					<Link className={merge('ml-auto', linkStyles)} href={nextItem.href}>
						{nextItem.title}{' '}
						<IconChevronLeft width={20} height={20} className="rotate-180" />
					</Link>
				)}
			</div>
		</footer>
	)
}
