/* eslint-disable @typescript-eslint/naming-convention */
'use client'
import { request, type RequestConfigOnly } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import type { ImageRequestBody } from './models'

/**
 * Image generation and description fetcher
 */
export function fetchImage(
	body: ImageRequestBody & { n?: 1 | 0 | null },
	config?: RequestConfigOnly
): ReturnType<typeof request<string, ImageRequestBody>>
export function fetchImage(
	body: ImageRequestBody & { n: number },
	config?: RequestConfigOnly
): ReturnType<typeof request<string[], ImageRequestBody>>
export function fetchImage(body: ImageRequestBody, config?: RequestConfigOnly) {
	return request(ApiUrlEnum.image, {
		body,
		...config,
	})
}
