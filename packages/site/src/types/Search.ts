import type { ReactNode } from 'react'

// Flexsearch result
export type SearchResult = {
	/**
	 * How closely the page matches the search query
	 */
	_pageRank: number
	/**
	 * How closely the section matches the search query
	 */
	_sectionRank: number
	route: string
	prefix: ReactNode
	children: ReactNode
}

// Search result item to render
export type SearchResultItem = {
	children: ReactNode
	id: string
	prefix?: ReactNode
	route: string
}
