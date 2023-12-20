'use client'

import type { PromptResponseBody, PromptRequestBody } from './models'
import {
	useRequest,
	type UseRequestConsumerConfig,
} from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'

/**
 * A client-side fetch handler hook that answers a `prompt` or an array of `messages` and returns the response as-is.
 * @see `ApiUrlEnum.prompt`
 */
export function usePrompt(
	/**
	 * @link PromptRequestBody
	 */
	body: PromptRequestBody,
	/**
	 * Fetch utility hook request options without the `fetcher`. Allows for overriding the default `request` config.
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
	 */
	config?: UseRequestConsumerConfig<PromptRequestBody>
) {
	return useRequest<PromptResponseBody>(ApiUrlEnum.prompt, {
		body,
		...config,
	})
}
