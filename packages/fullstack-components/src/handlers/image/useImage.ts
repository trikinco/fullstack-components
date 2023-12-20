'use client'

import type { ImageRequestBody } from './models'
import {
	useRequest,
	type UseRequestConsumerConfig,
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
): ReturnType<typeof useRequest<string, ImageRequestBody>>
export function useImage(
	body: ImageRequestBody & { n: number },
	config?: UseRequestConsumerConfig<ImageRequestBody>
): ReturnType<typeof useRequest<string[], ImageRequestBody>>
export function useImage(
	body: ImageRequestBody,
	config?: UseRequestConsumerConfig<ImageRequestBody>
) {
	return useRequest(ApiUrlEnum.image, {
		body,
		...config,
	})
}
