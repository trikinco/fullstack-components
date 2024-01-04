import { memo, type ReactElement, type ReactNode } from 'react'
import escapeStringRegexp from 'escape-string-regexp'

export interface HighlightMatchesProps {
	value?: string
	match: string
}

/**
 * Highlights individual characters that match a search query while typing
 */
export const HighlightMatches = memo<HighlightMatchesProps>(
	function HighlightMatches({
		value,
		match,
	}: HighlightMatchesProps): ReactElement | null {
		if (!value) return null

		const splitText = value.split('')
		const escapedSearch = escapeStringRegexp(match.trim())
		const regexp = new RegExp(escapedSearch.replaceAll(' ', '|'), 'ig')

		let result
		let index = 0
		const content: (string | ReactNode)[] = []

		while (
			(result = regexp.exec(value)) &&
			// case `>  ` replaced previously to `>||` + some characters provoke a memory leak because
			// `RegExp#exec` will always return a match
			regexp.lastIndex !== 0
		) {
			const before = splitText.splice(0, result.index - index).join('')
			const after = splitText
				.splice(0, regexp.lastIndex - result.index)
				.join('')

			content.push(
				before,
				<span key={result.index} className="text-blue-600">
					{after}
				</span>
			)
			index = regexp.lastIndex
		}

		return (
			<>
				{content}
				{splitText.join('')}
			</>
		)
	}
)
