'use client'

import type { HtmlPageResponse, HtmlPageRequestBody } from './models'
import {
	useRequest,
	type UseRequestConsumerConfig,
} from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'

/**
 * HTML Page client hook.
 * Creates a HTML page based on prompts.
 * Will by default set the `theme` to the current `prefers-color-scheme` setting.
 */
export interface UseHtmlPageParameters {
	body: HtmlPageRequestBody
	config?: UseRequestConsumerConfig<HtmlPageRequestBody>
}

export const useHtmlPage = (
	body: UseHtmlPageParameters['body'],
	config?: UseHtmlPageParameters['config']
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
