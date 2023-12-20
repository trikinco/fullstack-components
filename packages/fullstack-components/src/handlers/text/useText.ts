'use client'

import {
	useRequest,
	type UseRequestConsumerConfig,
} from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import { fetchText } from './fetchers'
import type { TextRequestBody, TextResponse, TextParameters } from './models'

/**
 * A client-side fetch handler hook that generates text. Handles plain text `content` or transforms React trees to a HTML string.
 * @see `ApiUrlEnum.text`
 */
export function useText(
	/**
	 * TextParameters extends TextRequestBody to allow for `content` to be a React tree.
	 * @link TextRequestBody
	 */
	body: TextParameters,
	/**
	 * Fetch utility hook request options without the `fetcher`. Allows for overriding the default `request` config.
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
	 */
	config?: UseRequestConsumerConfig<TextRequestBody>
) {
	return useRequest<TextResponse>(ApiUrlEnum.text, {
		...config,
		fetcher: () => fetchText(body),
	})
}
