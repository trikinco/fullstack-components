import Link from 'next/link'
import type { KeyboardEvent } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'
import { Spinner } from '@/src/components/Spinner'
import type { SearchResultItem } from '@/src/types/Search'

export interface SearchResultsProps {
	/**
	 * The search state
	 * No state shows empty/no results
	 */
	state?: 'error' | 'loading' | 'results'
	/**
	 * All current search results
	 */
	results: SearchResultItem[]
	/**
	 * The active search results list item
	 */
	activeResult: number
	/**
	 * Accessible id, used to connect aria attributes as a combobox
	 */
	id: string
	/**
	 * Handles whether a result item is active
	 */
	handleActive: (e: {
		currentTarget: {
			dataset: DOMStringMap
		}
	}) => void
	/**
	 * Finishes the search phase when a result is selected
	 */
	finishSearch: () => void
	/**
	 * Handle the keydown on a result link
	 */
	handleKeyDown: <T>(e: KeyboardEvent<T>) => void
}

/**
 * Options for the search combobox ul/list
 */
export const SearchOptions = ({
	handleActive,
	handleKeyDown,
	finishSearch,
	activeResult,
	state,
	results,
	id,
}: SearchResultsProps) => {
	switch (state) {
		case 'error':
			return (
				<li className="flex justify-center gap-2 p-8 text-center text-red-500">
					Failed to load search results
				</li>
			)
		case 'loading':
			return (
				<li className="flex justify-center gap-2 p-8 text-center text-slate-500 dark:text-slate-300">
					<Spinner
						className="flex gap-3 p-3 items-center"
						classNameSpinner="mb-0"
					>
						Loading...
					</Spinner>
				</li>
			)
		case 'results':
			return results.map(({ route, prefix, children, id }, i) => (
				<li
					key={id}
					role="option"
					aria-selected={i === activeResult}
					className={merge('mx-2.5 [&>div]:first:mt-0')}
					id={`${id}-option-${i}`}
				>
					{prefix}
					<span
						className={merge(
							'block break-words rounded-md',
							'contrast-more:border',
							i === activeResult
								? 'bg-blue-500/10 text-blue-600 contrast-more:border-blue-500'
								: 'text-gray-800 contrast-more:border-transparent dark:text-gray-300'
						)}
					>
						<Link
							className="block scroll-m-12 px-2.5 py-2"
							href={route}
							data-index={i}
							onFocus={handleActive}
							onMouseMove={handleActive}
							onClick={finishSearch}
							onKeyDown={handleKeyDown}
						>
							{children}
						</Link>
					</span>
				</li>
			))
		default:
			return (
				<li className="flex justify-center gap-2 p-8 text-center text-slate-500 dark:text-slate-300">
					No search results
				</li>
			)
	}
}
