import type {
	DetailedHTMLProps,
	DetailsHTMLAttributes,
	HTMLAttributes,
	ReactNode,
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
	children,
	className,
	summaryProps,
	contentProps,
	...rest
}: AccordionProps) => {
	const { className: summaryClassName, ...summaryRest } = summaryProps || {}
	const { className: contentClassName, ...contentRest } = contentProps || {}

	return (
		<details {...rest}>
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
