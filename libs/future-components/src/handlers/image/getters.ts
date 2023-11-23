import { request } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import { IS_DEV } from '../../utils/constants'
import type { ImageResponse, ImageRequestBody } from './models'
import type { ImageProps } from '../../types/Image'

/**
 * Image generation and description fetcher
 */
export function getImage<T>(props: ImageProps<T>) {
	const { prompt, src } = props as ImageRequestBody

	if (!('prompt' in props) && 'alt' in props) {
		if (IS_DEV) {
			console.warn(
				`Provided 'alt' and no 'prompt' for image.\nYou may want to use '<Image>' from 'next/image' instead.`
			)
		}

		return false
	}

	return request<ImageResponse>(ApiUrlEnum.image, { body: { prompt, src } })
}
