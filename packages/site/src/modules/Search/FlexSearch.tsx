'use client'
import { Search, type SearchProps } from '@/src/modules/Search/Search'
import { useFlexSearch } from '@/src/modules/Search/useFlexSearch'

export function FlexSearch({ className, ...rest }: Partial<SearchProps>) {
	const { loading, error, search, results, handleChange, preload } =
		useFlexSearch()

	return (
		<Search
			className={className}
			loading={loading}
			error={error}
			value={search}
			onChange={handleChange}
			onActive={preload}
			results={results}
			{...rest}
		/>
	)
}

export default FlexSearch
