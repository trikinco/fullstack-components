import { request, type RequestConfigOnly } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import { ordinal } from '../../utils/lang'
import type { TextProps, TextResponse } from './models'

/**
 * Text generation request
 * Transforms `content` react trees to a HTML string
 */
export async function getText(props: TextProps, config?: RequestConfigOnly) {
	const { content: rawContent, grade: rawGrade, ...options } = props || {}
	const grade =
		typeof rawGrade === 'number' ? `${ordinal(rawGrade)}-grade` : rawGrade

	let content = ''

	if (typeof window === 'undefined') {
		// Server only
		const { renderToStaticMarkup } = await import(
			'../../utils/renderToStaticMarkup'
		)
		content = await renderToStaticMarkup(rawContent)
	} else {
		// Client - for useText and client components
		const { renderToString } = await import('../../client/renderToString')
		content = await renderToString(rawContent)
	}

	return request<TextResponse>(ApiUrlEnum.text, {
		body: {
			...options,
			grade,
			content,
		},
		...config,
	})
}
