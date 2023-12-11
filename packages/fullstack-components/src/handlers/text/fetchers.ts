'use client'
import { request, type RequestConfigOnly } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import { ordinal } from '../../utils/lang'
import { renderTreeToString } from './renderTreeToString'
import type { TextParameters, TextResponse } from './models'

/**
 * Text generation fetcher
 * Transforms `content` react trees to a HTML string
 */
export async function fetchText(
	props: TextParameters,
	config?: RequestConfigOnly
) {
	const { content: rawContent, grade: rawGrade, ...options } = props || {}
	const grade =
		typeof rawGrade === 'number' ? `${ordinal(rawGrade)}-grade` : rawGrade
	const content = await renderTreeToString(rawContent)

	return request<TextResponse>(ApiUrlEnum.text, {
		body: {
			...options,
			grade,
			content,
		},
		...config,
	})
}
