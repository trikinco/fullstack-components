'use client'
import { request, type RequestConfigOnly } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import type {
	NotFoundEnhancerResponse,
	NotFoundEnhancerRequestBody,
} from './models'

/**
 * Finds the closest matching page to the URL that was not found, and uses the contents of your website URLs to create a helpful message.
 *
 * Client-side fetch handler that calls the internal Next.js API route handler, then the third-party API. Best used for Client Components and functionality.
 * @see `ApiUrlEnum.notFoundEnhancer`
 */
export function fetchNotFoundEnhancement(
	/**
	 * @link NotFoundEnhancerRequestBody
	 */
	body: NotFoundEnhancerRequestBody,
	/**
	 * Fetch utility request options without the `body`
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
	 */
	config?: RequestConfigOnly
) {
	return request<NotFoundEnhancerResponse>(ApiUrlEnum.notFoundEnhancer, {
		body,
		...config,
	})
}
