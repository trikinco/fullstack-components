/* eslint-disable @typescript-eslint/naming-convention */
import { request, type RequestConfigOnly } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import { IS_DEV } from '../../utils/constants'
import type { ImageResponse, ImageRequestBody } from './models'
import type {
	ImageProps,
	ImageGenerateProps,
	ImageDescribeProps,
} from '../../types/Image'

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

/**
 * Image generation and description fetcher
 * Enhanced Image component for `next/image`
 */
export function fetchEnhancedImage(
	props: ImageProps,
	config?: RequestConfigOnly
): false | Promise<ImageResponse<1>> {
	const {
		prompt,
		src,
		model,
		response_format,
		size,
		user,
		imageQuality,
		imageStyle,
	} = props as ImageGenerateProps & ImageDescribeProps

	if (!('prompt' in props) && 'alt' in props) {
		if (IS_DEV) {
			console.warn(
				`Provided 'alt' and no 'prompt' for image.\nYou may want to use '<Image>' from 'next/image' instead.`
			)
		}

		return false
	}

	return fetchImage(
		{
			prompt,
			src,
			model,
			response_format,
			size,
			user,
			n: 1,
			quality: imageQuality,
			style: imageStyle,
		},
		config
	)
}
