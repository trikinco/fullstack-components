import { merge } from '@trikinco/fullstack-components/utils'
import { SearchInput } from '@/src/modules/Search/SearchInput'
import { SearchOptions } from '@/src/modules/Search/SearchOptions'
import { useSearch, type UseSearchProps } from './useSearch'

export interface SearchProps extends UseSearchProps {
	className?: string
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
					className="fixed m-0 w-full h-screen top-0 left-0 z-10 bg-white/30 dark:bg-slate-950/30"
					onClick={() => setIsShown(false)}
				/>
			)}

			<div className={merge('relative z-20 md:w-64', className)}>
				<SearchInput
					ref={inputRef}
					id={id}
					value={value}
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
				/>

				<ul
					id={id}
					ref={listRef}
					role="listbox"
					aria-label="Search results"
					className={merge(
						'border border-gray-200 bg-white text-gray-100 dark:border-slate-700 dark:bg-slate-800',
						'fixed md:absolute top-full mt-2 overflow-auto overscroll-contain rounded-xl py-2.5 shadow-xl',
						'max-h-[min(calc(50vh-11rem-env(safe-area-inset-bottom)),400px)]',
						'md:max-h-[min(calc(100vh-5rem-env(safe-area-inset-bottom)),400px)]',
						'inset-x-0 md:left-auto mx-auto',
						'contrast-more:border contrast-more:border-gray-900 contrast-more:dark:border-gray-50',
						'w-screen min-h-[100px] max-w-[min(calc(100vw-2rem),calc(100%+20rem))]',
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
