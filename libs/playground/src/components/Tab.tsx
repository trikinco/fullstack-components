import type { DetailedHTMLProps, ButtonHTMLAttributes, ReactNode } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'

export interface TabProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	/**
	 * The id of the associated tabpanel the tab controls
	 */
	tabId: string
	/**
	 * Unique id for the tabpanel
	 */
	id: string
	/**
	 * The tabpanel children
	 */
	children?: ReactNode
	/**
	 * The tab icon
	 */
	icon?: ReactNode
	/**
	 * If the tab and tabpanel is selected
	 */
	selected?: boolean
}

export const Tab = ({
	id,
	tabId,
	selected,
	children,
	icon,
	className,
	...rest
}: TabProps) => {
	return (
		<button
			id={id}
			aria-controls={tabId}
			aria-selected={selected}
			tabIndex={selected ? 0 : -1}
			role="tab"
			type="button"
			className={merge(
				'flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3 disabled:cursor-not-allowed',
				selected && 'bg-white dark:bg-gray-800 shadow'
			)}
			{...rest}
		>
			{icon && (
				<span
					className={merge(
						'flex-none',
						selected ? 'text-sky-500' : 'text-slate-600 dark:text-slate-400'
					)}
				>
					{icon}
				</span>
			)}
			<span
				className={merge(
					'sr-only lg:not-sr-only lg:ml-2',
					selected
						? 'text-slate-900 dark:text-white'
						: 'text-slate-600 dark:text-slate-400'
				)}
			>
				{children}
			</span>
		</button>
	)
}
