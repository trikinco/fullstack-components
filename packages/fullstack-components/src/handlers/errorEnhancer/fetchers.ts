'use client'
import { request, type RequestConfigOnly } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import type {
	ErrorEnhancementResponse,
	ErrorEnhancementRequestBody,
} from './models'

/**
 * Enhances the provided error with additional information.
 *
 * Error enhancement client-side fetch handler that calls the internal Next.js API route handler, then the third-party API. Best used for Client Components and functionality.
 * @see `ApiUrlEnum.errorEnhancer`
 * @returns {Promise<ErrorEnhancementResponse>} JSON response
 */
export function fetchErrorEnhancement(
	/**
	 * @link ErrorEnhancementRequestBody
	 */
	body: ErrorEnhancementRequestBody,
	/**
	 * Fetch utility request options without the `body`
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
	 */
	config?: RequestConfigOnly
) {
	return request<ErrorEnhancementResponse>(ApiUrlEnum.errorEnhancer, {
		body,
		...config,
	})
}
