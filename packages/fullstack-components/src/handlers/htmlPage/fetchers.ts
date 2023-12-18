'use client'
import { request, type RequestConfigOnly } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import type { HtmlPageResponse, HtmlPageRequestBody } from './models'

/**
 * Generates a website based on the provided `HtmlPageRequestBody`.
 *
 * HtmlPage generation client-side fetch handler that calls the internal Next.js API route handler, then the third-party API. Best used for Client Components and functionality.
 * @see `ApiUrlEnum.htmlPage`
 * @returns {Promise<HtmlPageResponse>} JSON response
 */
export async function fetchHtmlPage(
	/**
	 * @link HtmlPageRequestBody
	 */
	body: HtmlPageRequestBody,
	/**
	 * Fetch utility request options without the `body`
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
	 */
	config?: RequestConfigOnly
) {
	return request<HtmlPageResponse>(ApiUrlEnum.htmlPage, {
		body,
		...config,
	})
}
