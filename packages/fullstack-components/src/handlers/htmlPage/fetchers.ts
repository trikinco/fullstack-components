'use client'
import { request, type RequestConfigOnly } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import type { HtmlPageRequestBody } from './models'

/**
 * Generates a website based on the provided `HtmlPageRequestBody`.
 *
 * Client-side fetch handler that calls the internal Next.js API route handler, then the third-party API. Best used for Client Components and functionality.
 * @see `ApiUrlEnum.htmlPage`
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
): Promise<string> {
	return request<string>(ApiUrlEnum.htmlPage, {
		body,
		...config,
	})
}
