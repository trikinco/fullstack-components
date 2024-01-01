'use client'
import { request, type RequestConfigOnly } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import type { SelectResponse, SelectRequestBody } from './models'

/**
 * Generates a `label` and a list of options in `content` based on the provided `SelectRequestBody`.
 *
 * Client-side fetch handler that calls the internal Next.js API route handler, then the third-party API. Best used for Client Components and functionality.
 * @see `ApiUrlEnum.select`
 */
export function fetchSelect(
	/**
	 * @link SelectRequestBody
	 */
	body: SelectRequestBody,
	/**
	 * Fetch utility request options without the `body`
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
	 */
	config?: RequestConfigOnly
): Promise<SelectResponse> {
	return request<SelectResponse>(ApiUrlEnum.select, { body, ...config })
}
