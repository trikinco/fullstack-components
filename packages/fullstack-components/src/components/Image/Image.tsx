/* eslint-disable @typescript-eslint/naming-convention */
import NextImage from 'next/image'
import type { SyntheticEvent } from 'react'
import type {
	ImageProps,
	ImageDescribeCallback,
	ImageGenerateCallback,
} from '../../types/Image'
import { ImageGeneration } from './ImageGeneration'
import { getEnhancedImage } from '../../handlers/image/getters'

/**
 * client-only callback for Image `onLoad` | `onError`
 */
function imageEvent<T extends ImageDescribeCallback | ImageGenerateCallback>(
	handler?: T,
	response?: Parameters<T>[1],
	meta?: Parameters<T>[2]
) {
	return (event: SyntheticEvent<HTMLImageElement, Event> | undefined) =>
		handler?.(event, response, meta)
}

/**
 * Shows an image.
 * - Generates an image if you provide a `prompt`.
 * - Describes an image by generating `alt` text if you provide an `src` URL and no `alt`.
 * - Otherwise renders as a regular `<Image>` from `next/image`.
 */
export async function Image(
	/**
	 * @link ImageProps
	 */
	props: ImageProps
) {
	const response = await getEnhancedImage(props)
	const isClient = typeof window !== 'undefined'

	// Image generation
	if ('prompt' in props && response) {
		const { prompt, onLoad, onError, ...rest } = props

		return (
			<ImageGeneration
				response={response}
				prompt={prompt}
				onLoad={isClient ? imageEvent?.(onLoad, response, prompt) : undefined}
				onError={isClient ? imageEvent?.(onError, response, prompt) : undefined}
				{...rest}
			/>
		)
	}

	// Image description
	if ('src' in props && !('alt' in props) && response) {
		const { src, showResult, onLoad, onError, ...rest } = props || {}

		return (
			<>
				<NextImage
					src={src}
					alt={response}
					onLoad={isClient ? imageEvent?.(onLoad, response, src) : undefined}
					onError={isClient ? imageEvent?.(onError, response, src) : undefined}
					{...rest}
				/>
				{showResult && response}
			</>
		)
	}

	// Regular Next image
	return <NextImage src="" alt="" {...props} />
}
