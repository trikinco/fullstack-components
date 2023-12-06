/* eslint-disable @typescript-eslint/naming-convention */
'use server'
import { IS_DEV } from '../../utils/constants'
import type {
	ImageProps,
	ImageGenerateProps,
	ImageDescribeProps,
} from '../../types/Image'
import { getImage } from './imageClient'

/**
 * Image generation and description getter
 * Used to make enhanced `Image` components similar to `next/image`
 */
export async function getEnhancedImage(props: ImageProps) {
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

		return ''
	}

	const response = await getImage({
		prompt,
		src,
		model,
		response_format,
		size,
		user,
		n: 1,
		quality: imageQuality,
		style: imageStyle,
	})

	return response.responseText
}
