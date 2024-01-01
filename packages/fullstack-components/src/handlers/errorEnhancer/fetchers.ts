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
 * Client-side fetch handler that calls the internal Next.js API route handler, then the third-party API. Best used for Client Components and functionality.
 * @see `ApiUrlEnum.errorEnhancer`
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
): Promise<ErrorEnhancementResponse> {
	return request<ErrorEnhancementResponse>(ApiUrlEnum.errorEnhancer, {
		body,
		...config,
	})
}
