'use client'
import { request, type RequestConfigOnly } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import type { HtmlPageResponse, HtmlPageRequestBody } from './models'

/**
 * Html page generation fetcher
 */
export async function fetchHtmlPage(
	body: HtmlPageRequestBody,
	config?: RequestConfigOnly
) {
	return request<HtmlPageResponse>(ApiUrlEnum.htmlPage, {
		body,
		...config,
	})
}
