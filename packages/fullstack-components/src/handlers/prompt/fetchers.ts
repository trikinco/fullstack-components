'use client'
import { request, type RequestConfigOnly } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import type { PromptRequestBody } from './models'

/**
 * Answers a `prompt` or an array of `messages` and returns the response as-is.
 *
 * Client-side fetch handler that calls the internal Next.js API route handler, then the third-party API. Best used for Client Components and functionality.
 * @see `ApiUrlEnum.prompt`
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
): Promise<string> {
	return request<string>(ApiUrlEnum.prompt, { body, ...config })
}
