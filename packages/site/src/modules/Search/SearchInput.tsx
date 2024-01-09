import {
	forwardRef,
	type SetStateAction,
	type DetailedHTMLProps,
	type InputHTMLAttributes,
} from 'react'
import { merge } from '@trikinco/fullstack-components/utils'

export interface SearchInputProps
	extends Omit<
		DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
		'onChange'
	> {
	/**
	 * Input on change
	 */
	onChange: (newValue: string) => void
	/**
	 * Input on active
	 */
	onActive?: (active: boolean) => void
	/**
	 * Sets whether the search results list is shown
	 */
	setIsShown: (value: SetStateAction<boolean>) => void
	/**
	 * Sets the input focus state
	 */
	setIsFocused: (value: SetStateAction<boolean>) => void
	/**
	 * Accessible id, used to connect aria attributes as a combobox
	 */
	id: string
	/**
	 * Whether the component is focused
	 */
	isFocused?: boolean
	/**
	 * Whether the component has been mounted
	 */
	isMounted?: boolean
	/**
	 * The active search results list item
	 */
	activeResult: number
}

/**
 * Input for the Search component
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
	function SearchInput(
		{
			onChange,
			onActive,
			setIsShown,
			setIsFocused,
			children,
			value,
			id,
			className,
			placeholder,
			activeResult,
			isFocused,
			isMounted,
			...rest
		},
		ref
	) {
		return (
			<div className="relative flex items-center text-gray-900 contrast-more:text-gray-800 dark:text-gray-300 contrast-more:dark:text-gray-300">
				<input
					ref={ref}
					spellCheck={false}
					className={merge(
						'block w-full appearance-none rounded-md pl-3 pr-3 md:pr-12 py-2 transition-colors',
						'text-base md:text-sm',
						'bg-black/[.05] dark:bg-slate-50/10',
						'focus:bg-white dark:focus:bg-slate-900',
						'placeholder:text-slate-500 dark:placeholder:text-slate-400',
						'contrast-more:border contrast-more:border-current',
						className
					)}
					value={value}
					onChange={(e) => {
						const { value } = e.target
						onChange(value)
						setIsShown(Boolean(value))
					}}
					onFocus={() => {
						onActive?.(true)
						setIsFocused(true)
					}}
					onBlur={() => {
						setIsFocused(false)
					}}
					type="search"
					placeholder={placeholder}
					role="combobox"
					maxLength={100}
					aria-controls={id}
					aria-expanded={isFocused}
					aria-activedescendant={`${id}-option-${activeResult}`}
					{...rest}
				/>

				{isMounted && (
					<kbd
						className={merge(
							'absolute my-1.5 px-1.5 select-none right-2',
							'bg-white dark:bg-slate-950/10',
							'h-5 font-mono text-xs font-bold text-slate-500 dark:text-slate-200',
							'rounded border border-slate-950/10 dark:border-white/10',
							'contrast-more:border-current contrast-more:text-current contrast-more:dark:border-current',
							'items-center gap-0.5 transition-opacity',
							value
								? 'flex cursor-pointer hover:opacity-70'
								: 'pointer-events-none hidden sm:flex'
						)}
						title={value ? 'Clear' : undefined}
						onClick={() => {
							onChange('')
						}}
					>
						{value && isFocused ? (
							'ESC'
						) : navigator.userAgent.includes('Macintosh') ? (
							<>
								<span className="text-base">⌘</span>K
							</>
						) : (
							'CTRL K'
						)}
					</kbd>
				)}
			</div>
		)
	}
)
