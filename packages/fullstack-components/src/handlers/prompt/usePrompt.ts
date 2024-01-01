'use client'

import type { PromptRequestBody } from './models'
import {
	useRequest,
	type UseRequestConsumerConfig,
	type UseRequestReturn,
} from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'

/**
 * A client-side fetch handler hook that answers a `prompt` or an array of `messages` and returns the response as-is.
 * @see `ApiUrlEnum.prompt`
 */
export function usePrompt<T = string>(
	/**
	 * @link PromptRequestBody
	 */
	body: PromptRequestBody & { format?: 'text' | null },
	/**
	 * Fetch utility hook request options without the `fetcher`. Allows for overriding the default `request` config.
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
	 */
	config?: UseRequestConsumerConfig<PromptRequestBody>
): {
	/**
	 * Fetch loading state. `true` if the fetch is in progress.
	 */
	isLoading: boolean
	/**
	 * Fetch error state. `true` if an error occurred.
	 */
	isError: boolean
	/**
	 * Fetch error object if `isError` is `true`
	 */
	error: unknown
	/**
	 * Fetch response data if the fetch was successful.
	 */
	data: T | undefined
	/**
	 * Refetches the data.
	 */
	refetch: () => void
}
export function usePrompt<
	T = {
		[k: string]: unknown
	},
>(
	body: PromptRequestBody & { format: 'JSON' },
	config?: UseRequestConsumerConfig<PromptRequestBody>
): UseRequestReturn<T>
export function usePrompt<T = string>(
	body: PromptRequestBody,
	config?: UseRequestConsumerConfig<PromptRequestBody>
): UseRequestReturn<T> {
	return useRequest<T>(ApiUrlEnum.prompt, {
		body,
		...config,
	})
}
