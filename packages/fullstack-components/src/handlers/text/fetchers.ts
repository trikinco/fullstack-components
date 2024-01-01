'use client'
import { request, type RequestConfigOnly } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import { ordinal } from '../../utils/lang'
import { renderTreeToString } from './renderTreeToString'
import type { TextParameters, TextResponse } from './models'

/**
 * Rewrites, creates, edits and modifies text content for the web provided by the user. Handles plain text `content` or transforms React trees to a HTML string. Transforms numeric `grade` values to a string ordinal, e.g. `1` to `1st-grade`.
 *
 * Client-side fetch handler that calls the internal Next.js API route handler, then the third-party API. Best used for Client Components and functionality.
 * @see `ApiUrlEnum.text`
 */
export async function fetchText(
	/**
	 * TextParameters extends TextRequestBody to allow for `content` to be a React tree.
	 * @link TextRequestBody
	 */
	body: TextParameters,
	/**
	 * Fetch utility request options without the `body`
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
	 */
	config?: RequestConfigOnly
) {
	const { content: rawContent, grade: rawGrade, ...options } = body || {}
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
