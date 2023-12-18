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
 * Generates or describes a single image based on the provided `ImageProps`.
 * Logs warnings in development if `alt` is provided without `prompt`.
 * Used specifically for wrapping the `Image` component from `next/image`.
 *
 * Image Server Action that calls the third-party API directly on the server. This avoids calling the Next.js API route handler allowing for performant Server Components.
 * @link https://nextjs.org/docs/app/building-your-application/data-fetching/patterns Next.js Data Fetching Patterns and Best Practices
 * @returns {Promise<string>} Text description or the base64 string or URL of the generated image
 */
export async function getEnhancedImage(
	/**
	 * @link ImageProps
	 */
	props: ImageProps
) {
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
