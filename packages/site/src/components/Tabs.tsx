'use client'
import {
	useId,
	useState,
	type ReactNode,
	type HTMLAttributes,
	type KeyboardEvent,
	useCallback,
} from 'react'
import { merge } from '../../../fullstack-components/dist/utils'
import { Tab } from './Tab'

export interface TabProps {
	/**
	 * Unique id for the tabpanel
	 */
	id: string
	/**
	 * The tabpanel children
	 */
	children?: ReactNode
	/**
	 * The tab label text
	 */
	label?: ReactNode
	/**
	 * The tab icon
	 */
	icon?: ReactNode
	/**
	 * Disable the tab
	 */
	disabled?: boolean
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
	tabs: TabProps[]
}

/**
 * Tabs are a set of layered sections of content, known as tab panels, that display one panel of content at a time.
 * Uses auto-activation of tabs.
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/tabs/ Tabs Pattern}
 */
export const Tabs = ({ className, tabs, children, ...rest }: TabsProps) => {
	const tabsId = useId()
	const getId = useCallback(
		(id: string, i: number) => `${tabsId}-${id}-${i}`,
		[tabsId]
	)
	const [selectedTab, setSelectedTab] = useState(getId(tabs[0].id, 0))

	const getNextIndex = useCallback(
		(event: KeyboardEvent<HTMLButtonElement>, tabId: string) => {
			const index = parseInt(tabId.split('-').pop() || '')
			const firstId = getId(tabs[0].id, 0)
			const lastId = getId(tabs[tabs.length - 1].id, tabs.length - 1)

			switch (event.key) {
				// prev - if current is first, move to last
				case 'ArrowLeft':
					return tabId === firstId ? tabs.length - 1 : index - 1
				// next - if current is last, move to first
				case 'ArrowRight':
					return tabId === lastId ? 0 : index + 1
			}
		},
		[tabs, getId]
	)

	const handleRovingFocus = useCallback(
		(tabId: string) => (event: KeyboardEvent<HTMLButtonElement>) => {
			const nextIndex = getNextIndex(event, tabId)

			if (typeof nextIndex === 'number') {
				const nextId = getId(tabs[nextIndex].id, nextIndex)

				setSelectedTab(nextId)
				document.getElementById(`${nextId}-label`)?.focus()
			}
		},
		[getId, getNextIndex, tabs]
	)

	return (
		<div className="flex flex-col gap-3">
			<div className="flex items-center justify-end">
				<div
					className={merge(
						'flex space-x-1 rounded-lg bg-slate-100 dark:bg-black p-0.5'
					)}
					role="tablist"
					aria-orientation="horizontal"
				>
					{tabs.map(({ id, label, icon, disabled }, i) => {
						const tabId = getId(id, i)
						const isSelected = selectedTab === tabId

						return (
							<Tab
								key={`${tabId}-${label}`}
								id={`${tabId}-label`}
								tabId={tabId}
								selected={isSelected}
								onClick={() => setSelectedTab(tabId)}
								onKeyDown={handleRovingFocus(tabId)}
								icon={icon}
								disabled={disabled}
							>
								{label}
							</Tab>
						)
					})}
				</div>
			</div>

			<div
				className={merge(
					'grid grid-cols-1 grid-rows-1 items-center relative',
					className
				)}
				{...rest}
			>
				{tabs.map(({ id, children }, i) => {
					const tabId = getId(id, i)
					const isSelected = selectedTab === tabId

					return (
						<div
							key={tabId}
							id={tabId}
							aria-labelledby={`${tabId}-label`}
							tabIndex={isSelected ? 0 : -1}
							role="tabpanel"
							className={merge(
								'relative rounded-lg focus-ring',
								!isSelected && 'hidden'
							)}
						>
							{children}
						</div>
					)
				})}

				{children}
			</div>
		</div>
	)
}
