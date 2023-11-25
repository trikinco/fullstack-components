'use server'

import { request, type RequestConfigOnly } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import type { HtmlPageResponse, HtmlPageRequestBody } from './models'

/**
 * Html page generation
 */
export async function getHtmlPage(
	body: HtmlPageRequestBody,
	config?: RequestConfigOnly
) {
	return request<HtmlPageResponse>(ApiUrlEnum.htmlPage, {
		body,
		...config,
	})
}
