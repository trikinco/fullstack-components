'use client'

import type { HtmlPageResponse, HtmlPageRequestBody } from './models'
import {
	useRequest,
	type UseRequestConsumerConfig,
} from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'

/**
 * Creates a HTML page based on prompts
 * Will by default set the `theme` to the current `prefers-color-scheme` setting
 */
export const useHtmlPage = (
	body: HtmlPageRequestBody,
	config?: UseRequestConsumerConfig<HtmlPageRequestBody>
) => {
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
