'use client'
import {
	type ReactNode,
	type HTMLAttributes,
	useEffect,
	useState,
	useRef,
} from 'react'
import { usePathname } from 'next/navigation'
import { merge } from '@trikinco/fullstack-components/utils'
import SkipLink from '@/src/components/SkipLink'
import { ID_DOCS_TOC, ID_FOOTER, TOC_HEADINGS } from '@/src/utils/constants'

export interface DocsTocProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
	tocMarkupByRoutes: { [pathname: string]: string }
}

/**
 * Docs sidebar TOC
 */
export default function DocsToc({
	children,
	className,
	tocMarkupByRoutes,
}: DocsTocProps) {
	const pathname = usePathname()
	const observerRef = useRef<IntersectionObserver>()
	const [activeId, setActiveId] = useState('')
	const tableOfContens = tocMarkupByRoutes[pathname]

	useEffect(() => {
		const active = document.querySelector('.toc-active')
		if (!active) {
			document.querySelector('.toc-link')?.classList.add('toc-active')
		}
	}, [])

	useEffect(() => {
		if (activeId) {
			const oldActive = document.querySelector('.toc-active')
			const newActive = document.querySelector(`.toc-link[href="#${activeId}"]`)

			oldActive?.classList.remove('toc-active')
			newActive?.classList.add('toc-active')
		}
	}, [activeId])

	useEffect(() => {
		const handleObsever = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				if (entry?.isIntersecting) {
					setActiveId(entry.target.id)
				}
			})
		}

		observerRef.current = new IntersectionObserver(handleObsever, {
			rootMargin: '10% 0% -50% 0px',
		})

		const elements = document.querySelectorAll(TOC_HEADINGS.join(', '))
		if (observerRef.current && elements.length) {
			elements.forEach((elem) => observerRef.current?.observe(elem))
		}

		return () => observerRef.current?.disconnect()
	}, [])

	if (!tableOfContens) return null

	return (
		<nav
			className={merge('flex flex-col relative break-words', className)}
			aria-labelledby={ID_DOCS_TOC}
		>
			<SkipLink
				href={`#${ID_FOOTER}`}
				className="focus:mb-6 rounded-sm focus-ring"
			>
				Skip to the footer
			</SkipLink>
			<span className="text-lg font-bold" id={ID_DOCS_TOC}>
				On this page
			</span>
			<div dangerouslySetInnerHTML={{ __html: tableOfContens }} />
			{children}
		</nav>
	)
}
