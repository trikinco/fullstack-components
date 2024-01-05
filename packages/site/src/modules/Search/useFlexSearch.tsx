'use client'
import { useState } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'
import { HighlightMatches } from '@/src/modules/Search/HighlightMatches'
import FlexSearch from 'flexsearch'
import { getMdxPagesContent } from '@/src/modules/Search/actions'
import type { SearchResultItem, SearchResult } from '@/src/types/Search'

export interface UseFlexSearchProps {
	/**
	 * The language of the search
	 */
	locale?: string
	/**
	 * The base path to the directory to search in
	 */
	basePath?: string
}

export type SectionIndex = FlexSearch.Document<
	{
		id: string
		url: string
		title: string
		pageId: string
		content: string
		display?: string
	},
	['title', 'content', 'url', 'display']
>

export type PageIndex = FlexSearch.Document<
	{
		id: number
		title: string
		content: string
	},
	['title']
>

// This can be global for better caching.
const indexes: {
	[locale: string]: [PageIndex, SectionIndex]
} = {}

// Caches promises that load the index
const loadSearchIndexesPromises = new Map<string, Promise<void>>()

export const loadSearchIndexes = (
	basePath: string,
	locale: string
): Promise<void> => {
	const key = basePath + '@' + locale

	if (loadSearchIndexesPromises.has(key)) {
		return loadSearchIndexesPromises.get(key)!
	}

	const promise = getSearchIndexes(basePath, locale)

	loadSearchIndexesPromises.set(key, promise)

	return promise
}

export const getSearchIndexes = async (
	basePath: string,
	locale: string
): Promise<void> => {
	try {
		const searchData = await getMdxPagesContent({ basePath, pathname: 'docs' })
		let pageId = 0

		const pageIndex: PageIndex = new FlexSearch.Document({
			cache: 100,
			tokenize: 'full',
			document: {
				id: 'id',
				index: 'content',
				store: ['title'],
			},
			context: {
				resolution: 9,
				depth: 2,
				bidirectional: true,
			},
		})

		const sectionIndex: SectionIndex = new FlexSearch.Document({
			cache: 100,
			tokenize: 'full',
			document: {
				id: 'id',
				index: 'content',
				tag: 'pageId',
				store: ['title', 'content', 'url', 'display'],
			},
			context: {
				resolution: 9,
				depth: 2,
				bidirectional: true,
			},
		})

		for (const { title, route, content } of searchData) {
			let pageContent = ''
			++pageId

			for (const {
				id: sectionId,
				title: sectionTitle,
				content: paragraphs,
			} of content) {
				const contentTitle = sectionTitle || title
				const url = route + (sectionId ? '#' + sectionId : '')

				sectionIndex.add({
					id: url,
					url,
					pageId: `page_${pageId}`,
					title: contentTitle,
					content: contentTitle,
					...(paragraphs[0] && { display: paragraphs[0] }),
				})

				for (let i = 0; i < paragraphs.length; i++) {
					sectionIndex.add({
						id: `${url}_${i}`,
						url,
						pageId: `page_${pageId}`,
						title: contentTitle,
						content: paragraphs[i],
					})
				}

				pageContent += ` ${title} ${paragraphs.join('')}`
			}

			pageIndex.add({
				id: pageId,
				title,
				content: pageContent,
			})
		}

		indexes[locale] = [pageIndex, sectionIndex]
	} catch (error) {
		throw new Error(`Could not get search indexes: ${error}`)
	}
}

export function useFlexSearch({
	locale = 'en',
	basePath = 'src/app',
}: UseFlexSearchProps = {}) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [results, setResults] = useState<SearchResultItem[]>([])
	const [search, setSearch] = useState('')

	/**
	 * Perform a search.
	 * Select how many results to show.
	 * Sort results.
	 * Rank results.
	 * Highlight characters.
	 * Set the current results.
	 */
	const doSearch = (search: string) => {
		if (!search) return

		const [pageIndex, sectionIndex] = indexes[locale]
		const results: SearchResult[] = []
		const pageTitleMatches: Record<number, number> = {}

		// Show the results for the top 5 pages
		const pageResults =
			pageIndex.search<true>(search, 5, {
				enrich: true,
				suggest: true,
			})[0]?.result || []

		for (let i = 0; i < pageResults.length; i++) {
			const result = pageResults[i]
			const occurred: Record<string, boolean> = {}

			let isFirstItemOfPage = true
			pageTitleMatches[i] = 0

			// Show the top 5 sections for each page
			const sectionResults =
				sectionIndex.search<true>(search, 5, {
					enrich: true,
					suggest: true,
					tag: `page_${result.id}`,
				})[0]?.result || []

			for (let j = 0; j < sectionResults.length; j++) {
				const { doc } = sectionResults[j]
				const { url, title } = doc
				const content = doc.display || doc.content
				const isMatchingTitle = doc.display !== undefined

				if (isMatchingTitle) {
					pageTitleMatches[i]++
				}

				if (occurred[url + '@' + content]) continue

				occurred[url + '@' + content] = true

				// Create the results
				results.push({
					_pageRank: i,
					_sectionRank: j,
					route: url,
					prefix: isFirstItemOfPage && (
						<div
							className={merge(
								'mb-2 mt-6 mx-2 pb-1.5 select-none',
								'text-xs font-semibold uppercase text-slate-600 dark:text-slate-200',
								'border-b dark:border-white/20 border-black/10',
								'contrast-more:border-slate-600 contrast-more:text-slate-900 contrast-more:dark:border-gray-50 contrast-more:dark:text-gray-50'
							)}
						>
							{result.doc.title}
						</div>
					),
					children: (
						<>
							<div className="text-base font-semibold leading-5">
								<HighlightMatches match={search} value={title} />
							</div>
							{content && (
								<div
									className={merge(
										'excerpt mt-1 text-sm',
										'text-slate-600 dark:text-slate-300',
										'contrast-more:dark:text-slate-50'
									)}
								>
									<HighlightMatches match={search} value={content} />
								</div>
							)}
						</>
					),
				})
				isFirstItemOfPage = false
			}
		}

		setResults(
			results
				.sort((a, b) => {
					// Sort by number of matches in the title.
					if (a._pageRank === b._pageRank) {
						return a._sectionRank - b._sectionRank
					}
					if (pageTitleMatches[a._pageRank] !== pageTitleMatches[b._pageRank]) {
						return pageTitleMatches[b._pageRank] - pageTitleMatches[a._pageRank]
					}
					return a._pageRank - b._pageRank
				})
				.map((res) => ({
					id: `${res._pageRank}_${res._sectionRank}`,
					route: res.route,
					prefix: res.prefix,
					children: res.children,
				}))
		)
	}

	/**
	 * Preload search indexes
	 */
	const preload = async (active: boolean) => {
		if (active && !indexes?.[locale]) {
			setLoading(true)

			try {
				await loadSearchIndexes(basePath, locale)
			} catch (error) {
				setError(true)
				throw new Error(`Could not preload search indexes: ${error}`)
			} finally {
				setLoading(false)
			}
		}
	}

	/**
	 * Handles changing the search input
	 */
	const handleChange = async (value: string) => {
		setSearch(value)

		if (loading) {
			return
		}

		if (!indexes?.[locale]) {
			setLoading(true)

			try {
				await loadSearchIndexes(basePath, locale)
			} catch (error) {
				setError(true)
				throw new Error(
					`Could not load search indexes on query "${value}": ${error}`
				)
			} finally {
				setLoading(false)
			}
		}

		doSearch(value)
	}

	return {
		error,
		loading,
		results,
		search,
		preload,
		doSearch,
		handleChange,
	}
}
