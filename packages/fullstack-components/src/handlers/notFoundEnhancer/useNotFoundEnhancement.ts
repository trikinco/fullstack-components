'use client'

import type {
	NotFoundEnhancerResponse,
	NotFoundEnhancerRequestBody,
} from './models'
import {
	useRequest,
	type UseRequestConsumerConfig,
} from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'

/**
 * A client-side fetch handler hook that finds the closest matching page to the URL that was not found, and uses the contents of your website URLs to create a helpful message.
 * @default `requestedUrl` is set to `window.location.href`
 * @see `ApiUrlEnum.notFoundEnhancer`
 */
export function useNotFoundEnhancement(
	/**
	 * @link NotFoundEnhancerRequestBody
	 * @default `requestedUrl` is set to `window.location.href`
	 */
	body?: NotFoundEnhancerRequestBody,
	/**
	 * Fetch utility hook request options without the `fetcher`. Allows for overriding the default `request` config.
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
	 */
	config?: UseRequestConsumerConfig<NotFoundEnhancerRequestBody>
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
	data: NotFoundEnhancerResponse | undefined
	/**
	 * Refetches the data.
	 */
	refetch: () => void
} {
	return useRequest<NotFoundEnhancerResponse>(ApiUrlEnum.notFoundEnhancer, {
		body: {
			requestedUrl: typeof window !== 'undefined' && window.location.href,
			...body,
		},
		...config,
	})
}
