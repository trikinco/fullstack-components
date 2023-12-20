'use client'

import {
	useRequest,
	type UseRequestConsumerConfig,
} from '../../hooks/useRequest'
import type {
	ErrorEnhancementRequestBody,
	ErrorEnhancementResponse,
} from './models'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'

/**
 * A client-side fetch handler hook for enhancing the provided error with additional information to help users and developers.
 * @see `ApiUrlEnum.errorEnhancer`
 */
export function useErrorEnhancement(
	/**
	 * @link ErrorEnhancementRequestBody
	 */
	body: ErrorEnhancementRequestBody,
	/**
	 * Fetch utility hook request options without the `fetcher`. Allows for overriding the default `request` config.
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
	 */
	config?: UseRequestConsumerConfig<ErrorEnhancementRequestBody>
) {
	return useRequest<ErrorEnhancementResponse>(ApiUrlEnum.errorEnhancer, {
		body,
		...config,
	})
}
