'use client'

import type { HtmlPageResponse, HtmlPageRequestBody } from './models'
import {
	useRequest,
	type UseRequestConsumerConfig,
} from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'

/**
 * A client-side fetch handler hook for creating a HTML page based on a provided `prompt`, and other optional parameters.
 * @default `theme` is set to the current `prefers-color-scheme` value using `window.matchMedia`
 * @see `ApiUrlEnum.htmlPage`
 */
export function useHtmlPage(
	/**
	 * @link HtmlPageRequestBody
	 * @default `theme` is set to the current `prefers-color-scheme` value using `window.matchMedia`
	 */
	body: HtmlPageRequestBody,
	/**
	 * Fetch utility hook request options without the `fetcher`. Allows for overriding the default `request` config.
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
	 */
	config?: UseRequestConsumerConfig<HtmlPageRequestBody>
) {
	const isPrefersDark =
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
	const themePreference = isPrefersDark ? 'dark' : 'light'

	return useRequest<HtmlPageResponse>(ApiUrlEnum.htmlPage, {
		body: {
			theme: themePreference,
			...body,
		},
		...config,
	})
}
