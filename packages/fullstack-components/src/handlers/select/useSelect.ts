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
) {
	return useRequest<SelectResponse>(ApiUrlEnum.select, {
		body,
		...config,
	})
}
