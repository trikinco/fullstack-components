import { useRouter } from 'next/navigation'
import {
	useCallback,
	useEffect,
	useRef,
	useState,
	useId,
	type CompositionEvent,
	type KeyboardEvent,
} from 'react'
import { useIsMounted } from '@/src/hooks/useIsMounted'
import type { SearchResultItem } from '@/src/types/Search'

const INPUTS = ['input', 'select', 'button', 'textarea']

export interface UseSearchProps {
	/**
	 * Search input on change
	 */
	onChange: (newValue: string) => void
	/**
	 * The search query
	 */
	value: string
	/**
	 * Whether the search is loading
	 */
	loading?: boolean
	/**
	 * Whether the search has failed
	 */
	error?: boolean
	/**
	 * The search results
	 */
	results: SearchResultItem[]
}

export function useSearch({
	onChange,
	value,
	loading,
	error,
	results,
}: UseSearchProps) {
	const id = useId()
	const router = useRouter()
	const isMounted = useIsMounted()
	const [isShown, setIsShown] = useState(false)
	const [activeResult, setActiveResult] = useState(0)
	const [isFocused, setIsFocused] = useState(false)
	const [isCompositionEnd, setIsCompositionEnd] = useState(true)
	const inputRef = useRef<HTMLInputElement>(null)
	const listRef = useRef<HTMLUListElement>(null)
	const shouldShowList = isShown && Boolean(value)
	// The search state
	const state: 'error' | 'loading' | 'results' | undefined = error
		? 'error'
		: loading
			? 'loading'
			: results.length > 0
				? 'results'
				: undefined

	/**
	 * Sets the initially active search result item
	 */
	useEffect(() => {
		setActiveResult(0)
	}, [value])

	/**
	 * Global handler for focusing on the search on ctrl/cmd+K
	 */
	useEffect(() => {
		const handleHotkey = (e: globalThis.KeyboardEvent): void => {
			const activeElement = document.activeElement as HTMLElement
			const tagName = activeElement?.tagName.toLowerCase()

			if (
				!inputRef.current ||
				!tagName ||
				INPUTS.includes(tagName) ||
				activeElement?.isContentEditable
			)
				return
			if (
				e.key === '/' ||
				(e.key === 'k' &&
					(e.metaKey /* for Mac */ || /* for non-Mac */ e.ctrlKey))
			) {
				e.preventDefault()
				// prevent scrolling to the top of the page when triggering the hotkey
				inputRef.current.focus({ preventScroll: true })
			} else if (e.key === 'Escape') {
				setIsShown(false)
				inputRef.current.blur()
			}
		}

		window.addEventListener('keydown', handleHotkey)
		return () => {
			window.removeEventListener('keydown', handleHotkey)
		}
	}, [])

	/**
	 * The user has finished searching, unfocus, reset input and close menu
	 */
	const finishSearch = useCallback(() => {
		inputRef.current?.blur()
		onChange('')
		setIsShown(false)
	}, [onChange])

	/**
	 * Sets which search result list item is currently active
	 */
	const handleActive = useCallback(
		(e: { currentTarget: { dataset: DOMStringMap } }) => {
			const { index } = e.currentTarget.dataset
			setActiveResult(Number(index))
		},
		[]
	)

	/**
	 * Handles search result list item navigation with the keyboard
	 */
	const handleKeydown = useCallback(
		function <T>(e: KeyboardEvent<T>) {
			switch (e.key) {
				case 'ArrowDown': {
					if (activeResult + 1 < results.length) {
						const link = listRef.current?.querySelector<HTMLAnchorElement>(
							`li:nth-of-type(${activeResult + 2}) a`
						)

						if (link) {
							e.preventDefault()
							handleActive({ currentTarget: link })
							link.focus()
						}
					}
					break
				}
				case 'ArrowUp': {
					if (activeResult - 1 >= 0) {
						const link = listRef.current?.querySelector<HTMLAnchorElement>(
							`li:nth-of-type(${activeResult}) a`
						)

						if (link) {
							e.preventDefault()
							handleActive({ currentTarget: link })
							link.focus()
						}
					}
					break
				}
				case 'Enter': {
					const result = results[activeResult]

					if (result && isCompositionEnd) {
						void router.push(result.route)
						finishSearch()
					}

					break
				}
				case 'Escape': {
					setIsShown(false)
					inputRef.current?.blur()
					break
				}
			}
		},
		[
			results,
			router,
			activeResult,
			isCompositionEnd,
			finishSearch,
			handleActive,
		]
	)

	/**
	 * Trigger the search after typing is complete for certain languages
	 */
	const handleComposition = useCallback(
		(e: CompositionEvent<HTMLInputElement>) => {
			setIsCompositionEnd(e.type === 'compositionend')
		},
		[]
	)

	return {
		id,
		inputRef,
		listRef,
		state,
		isMounted,
		isFocused,
		shouldShowList,
		activeResult,
		setIsFocused,
		setIsShown,
		handleActive,
		handleKeydown,
		handleComposition,
		finishSearch,
	}
}
