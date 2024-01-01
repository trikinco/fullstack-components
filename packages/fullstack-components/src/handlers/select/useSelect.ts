'use client'

import type { SelectResponse, SelectRequestBody } from './models'
import {
	useRequest,
	type UseRequestConsumerConfig,
} from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'

/**
 * A client-side fetch handler hook for generating a `label` and a list of options in `content` based on the provided `SelectRequestBody`.
 * @see `ApiUrlEnum.select`
 */
export function useSelect(
	/**
	 * @link SelectRequestBody
	 */
	body: SelectRequestBody,
	/**
	 * Fetch utility hook request options without the `fetcher`. Allows for overriding the default `request` config.
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
	 */
	config?: UseRequestConsumerConfig<SelectRequestBody>
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
	data: SelectResponse | undefined
	/**
	 * Refetches the data.
	 */
	refetch: () => void
} {
	return useRequest<SelectResponse>(ApiUrlEnum.select, {
		body,
		...config,
	})
}
