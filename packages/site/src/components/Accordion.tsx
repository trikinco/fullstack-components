'use client'
import {
	type DetailedHTMLProps,
	type DetailsHTMLAttributes,
	type HTMLAttributes,
	type ReactNode,
	useState,
	useEffect,
} from 'react'
import { merge } from '@trikinco/fullstack-components/utils'

export interface AccordionProps
	extends DetailedHTMLProps<
		DetailsHTMLAttributes<HTMLDetailsElement>,
		HTMLDetailsElement
	> {
	children?: ReactNode
	/**
	 * Summary label text
	 */
	label: ReactNode
	/**
	 * Additional props to pass to the summary `<summary>`.
	 */
	summaryProps?: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
	/**
	 * Additional props to pass to the content wrapper `<div>`.
	 */
	contentProps?: DetailedHTMLProps<
		HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	>
}

/**
 * A simple accordion component.
 */
export const Accordion = ({
	label,
	open,
	children,
	className,
	summaryProps,
	contentProps,
	...rest
}: AccordionProps) => {
	const { className: summaryClassName, ...summaryRest } = summaryProps || {}
	const { className: contentClassName, ...contentRest } = contentProps || {}
	const isPrint =
		typeof window !== 'undefined' && window.matchMedia('print').matches
	const [isDefaultOpen, setIsDefaultOpen] = useState(open ?? isPrint)

	// Open all details elements when printing
	useEffect(() => {
		const handlePrintMediaQueryChange = (event: MediaQueryListEvent) => {
			if (!event.matches) return

			setIsDefaultOpen(true)
		}

		const printMediaQuery = window.matchMedia('print')
		printMediaQuery.addEventListener('change', handlePrintMediaQueryChange)

		return () => {
			printMediaQuery.removeEventListener('change', handlePrintMediaQueryChange)
		}
	}, [])

	return (
		<details className={merge(className)} open={isDefaultOpen} {...rest}>
			<summary
				className={merge(
					'[&::marker]:content-none [&::-webkit-details-marker]:hidden list-none appearance-none flex gap-2 mt-3 cursor-pointer text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300',
					summaryClassName
				)}
				{...summaryRest}
			>
				{label}
			</summary>

			<div
				className={merge(
					'mt-3 border rounded-md border-slate-200 dark:border-slate-800',
					contentClassName
				)}
				{...contentRest}
			>
				{children}
			</div>
		</details>
	)
}

export default Accordion
