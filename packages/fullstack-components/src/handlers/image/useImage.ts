'use client'

import type { ImageRequestBody } from './models'
import {
	useRequest,
	type UseRequestConsumerConfig,
	type UseRequestReturn,
} from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'

/**
 * A client-side fetch handler hook for generating one or more images or describing a single image based on the provided `ImageRequestBody`.
 * @see `ApiUrlEnum.image`
 */
export function useImage(
	/**
	 * @link ImageRequestBody
	 */
	body: ImageRequestBody & { n?: 1 | 0 | null },
	/**
	 * Fetch utility hook request options without the `fetcher`. Allows for overriding the default `request` config.
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
	 */
	config?: UseRequestConsumerConfig<ImageRequestBody>
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
	 * @note returns an array of strings if `n` is > 1.
	 */
	data: string | undefined
	/**
	 * Refetches the data.
	 */
	refetch: () => void
}
export function useImage(
	body: ImageRequestBody & { n: number },
	config?: UseRequestConsumerConfig<ImageRequestBody>
): UseRequestReturn<string[]>
export function useImage(
	body: ImageRequestBody,
	config?: UseRequestConsumerConfig<ImageRequestBody>
): UseRequestReturn<string | string[]> {
	return useRequest(ApiUrlEnum.image, {
		body,
		...config,
	})
}
