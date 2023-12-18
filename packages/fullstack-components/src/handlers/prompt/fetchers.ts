'use client'
import { request, type RequestConfigOnly } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import type { PromptResponseBody, PromptRequestBody } from './models'

/**
 * Answers a `prompt` or an array of `messages` and returns the response as-is.
 *
 * Prompt client-side fetch handler that calls the internal Next.js API route handler, then the third-party API. Best used for Client Components and functionality.
 * @see `ApiUrlEnum.prompt`
 * @returns {Promise<PromptResponseBody>} JSON response
 */
export function fetchPrompt(
	/**
	 * @link PromptRequestBody
	 */
	body: PromptRequestBody,
	/**
	 * Fetch utility request options without the `body`
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
	 */
	config?: RequestConfigOnly
) {
	return request<PromptResponseBody>(ApiUrlEnum.prompt, { body, ...config })
}
