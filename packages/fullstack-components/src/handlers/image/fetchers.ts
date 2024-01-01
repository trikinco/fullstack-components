/* eslint-disable @typescript-eslint/naming-convention */
'use client'
import { request, type RequestConfigOnly } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import type { ImageRequestBody } from './models'

/**
 * Generates one or more images or describes a single image based on the provided `ImageRequestBody`.
 *
 * When generating an image returns a single image URL or an array of image URLs if `n` is > 1.
 *
 * Client-side fetch handler that calls the internal Next.js API route handler, then the third-party API. Best used for Client Components and functionality.
 * @see `ApiUrlEnum.image`
 */
export function fetchImage(
	/**
	 * @link ImageRequestBody
	 */
	body: ImageRequestBody & { n?: 1 | 0 | null },
	/**
	 * Fetch utility request options without the `body`
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
	 */
	config?: RequestConfigOnly
): Promise<string>
export function fetchImage(
	body: ImageRequestBody & { n: number },
	config?: RequestConfigOnly
): Promise<string[]>
export function fetchImage(
	body: ImageRequestBody,
	config?: RequestConfigOnly
): Promise<string | string[]> {
	return request(ApiUrlEnum.image, {
		body,
		...config,
	})
}
