'use client'
import { merge } from '@trikinco/fullstack-components/utils'
import { Label } from '@/src/components/Elements/Label'
import { SearchInput } from '@/src/modules/Search/SearchInput'
import { SearchOptions } from '@/src/modules/Search/SearchOptions'
import { useSearch, type UseSearchProps } from './useSearch'

export interface SearchProps extends UseSearchProps {
	className?: string
	/**
	 * If used full width on a page
	 */
	isSolo?: boolean
	/**
	 * Search input label when used `isSolo`
	 */
	label?: string
	/**
	 * The search input placeholder
	 */
	placeholder?: string
	/**
	 * Hides the search hotkey
	 */
	hideKey?: boolean
	/**
	 * Search input on active
	 */
	onActive?: (active: boolean) => void
}

/**
 * Search combobox with a list of options/results
 */
export function Search({
	onChange,
	onActive,
	className,
	label,
	isSolo,
	placeholder,
	hideKey,
	value,
	loading,
	error,
	results,
}: SearchProps) {
	const {
		id,
		state,
		inputRef,
		listRef,
		isFocused,
		isMounted,
		shouldShowList,
		activeResult,
		finishSearch,
		setIsShown,
		setIsFocused,
		handleActive,
		handleKeydown,
		handleComposition,
	} = useSearch({ onChange, value, loading, error, results })

	return (
		<>
			{/* Search backdrop */}
			{shouldShowList && (
				<div
					className="fixed m-0 w-full h-screen top-0 left-0 z-10 bg-black/10"
					onClick={() => setIsShown(false)}
				/>
			)}

			<div className={merge('relative z-20 w-full', className)}>
				{label && <Label htmlFor={`${id}-search`}>{label}</Label>}
				<SearchInput
					ref={inputRef}
					id={`${id}-search`}
					value={value}
					placeholder={placeholder}
					isFocused={isFocused}
					isMounted={isMounted}
					activeResult={activeResult}
					onChange={onChange}
					onActive={onActive}
					setIsFocused={setIsFocused}
					setIsShown={setIsShown}
					onCompositionStart={handleComposition}
					onCompositionEnd={handleComposition}
					onKeyDown={handleKeydown}
					hideKey={hideKey}
					maxLength={100}
					aria-controls={id}
					aria-expanded={isFocused}
					aria-activedescendant={`${id}-option-${activeResult}`}
					role="combobox"
				/>

				<ul
					id={id}
					ref={listRef}
					role="listbox"
					aria-label="Search results"
					className={merge(
						'border border-gray-200 bg-white text-gray-100 dark:border-slate-700 dark:bg-slate-800',
						'absolute top-full mt-2 overflow-auto overscroll-contain rounded-xl py-2.5 shadow-xl',
						'w-screen min-h-[100px]',
						'max-h-[min(calc(50vh-7rem-env(safe-area-inset-bottom)),400px)]',
						isSolo
							? 'max-w-[min(calc(100vw-3rem),100%)]'
							: // Wider when used in a navbar
								'max-w-[min(calc(100vw-3rem),calc(100%+20rem))]',
						'md:max-h-[min(calc(100vh-5rem-env(safe-area-inset-bottom)),400px)]',
						'inset-x-0 md:left-auto mx-auto',
						'contrast-more:border contrast-more:border-gray-900 contrast-more:dark:border-gray-50',
						shouldShowList ? 'flex flex-col' : 'hidden'
					)}
				>
					<SearchOptions
						handleActive={handleActive}
						handleKeyDown={handleKeydown}
						finishSearch={finishSearch}
						activeResult={activeResult}
						state={state}
						id={id}
						results={results}
					/>
				</ul>
			</div>
		</>
	)
}
