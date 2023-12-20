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
export function usePrompt<T = PromptResponseBody>(
	/**
	 * @link PromptRequestBody
	 */
	body: PromptRequestBody & { format?: 'text' | null },
	/**
	 * Fetch utility hook request options without the `fetcher`. Allows for overriding the default `request` config.
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
	 */
	config?: UseRequestConsumerConfig<PromptRequestBody>
): ReturnType<typeof useRequest<T, PromptRequestBody>>
export function usePrompt<
	T = {
		[k: string]: unknown
	},
>(
	body: PromptRequestBody & { format: 'JSON' },
	config?: UseRequestConsumerConfig<PromptRequestBody>
): ReturnType<typeof useRequest<T, PromptRequestBody>>
export function usePrompt<T = PromptResponseBody>(
	body: PromptRequestBody,
	config?: UseRequestConsumerConfig<PromptRequestBody>
) {
	return useRequest<T>(ApiUrlEnum.prompt, {
		body,
		...config,
	})
}
