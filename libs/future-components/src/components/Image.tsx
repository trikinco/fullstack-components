import NextImage, { type ImageProps as NextImageProps } from 'next/image'
import type { SyntheticEvent } from 'react'
import { request } from '../utils/request'
import { IS_DEV } from '../utils/constants'
import { ApiUrlEnum } from '../enums/ApiUrlEnum'

export interface ImageDescribeProps
	extends Omit<NextImageProps, 'src' | 'alt' | 'onLoad' | 'onError'> {
	/**
	 * URL to the image to describe. Generates `alt` text.
	 * The `alt` text is then passed to the image and returned in `onLoad`
	 */
	src: string
	/**
	 * Callback function invoked once the image is completely loaded and the `placeholder` has been removed.
	 * Returns the `event`, description `response` and the original `src`
	 */
	onLoad?: ImageDescribeCallback
	/** Callback function that is invoked if the image fails to load. */
	onError?: ImageDescribeCallback
}

export type ImageDescribeCallback = (
	event: SyntheticEvent<HTMLImageElement, Event> | undefined,
	/** Image description response */
	response?: unknown,
	/** Image description src */
	src?: string
) => void

export interface ImageGenerateProps
	extends Omit<
		NextImageProps,
		'src' | 'width' | 'height' | 'alt' | 'onLoad' | 'onError'
	> {
	/** Image generation prompt */
	prompt: string
	/** Width and height of the image. Default '256x256' */
	size?: '256x256' | '512x512' | '1024x1024'
	/** Alternative text describing the image, uses `prompt` if not provided */
	alt?: string
	/**
	 * Callback function invoked once the image is completely loaded and the `placeholder` has been removed.
	 * Returns the `event`, generation result `response` and the original `prompt`
	 */
	onLoad?: ImageGenerateCallback
	/** Callback function that is invoked if the image fails to load. */
	onError?: ImageGenerateCallback
}

export type ImageGenerateCallback = (
	event: SyntheticEvent<HTMLImageElement, Event> | undefined,
	/** Image generation response */
	response?: unknown,
	/** Image generation prompt */
	prompt?: string
) => void

export type ImageProps<T> = T extends { prompt: unknown }
	? ImageGenerateProps
	: T extends { alt: unknown }
	? NextImageProps
	: ImageDescribeProps

/**
 * Image generation and description fetcher
 */
export function getImage<T>(props: ImageProps<T>) {
	const shouldGenerateImage = 'prompt' in props
	const apiURL = shouldGenerateImage
		? ApiUrlEnum.imageGenerate
		: ApiUrlEnum.imageDescribe
	const body = shouldGenerateImage
		? { prompt: props.prompt }
		: { src: props.src }

	if (!('prompt' in props) && 'alt' in props) {
		if (IS_DEV) {
			console.warn(
				`Provided 'alt' and no 'prompt' for image.\nYou may want to use '<Image>' from 'next/image' instead.`
			)
		}

		return false
	}

	return request<{
		result: string
	}>(apiURL, { body })
}

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
 * - Describes an image by generating `alt` text if you provide an `src` URL.
 * - Otherwise renders as a regular `<Image>` from `next/image`.
 */
export async function Image<T>(props: ImageProps<T>) {
	const response = await getImage(props)
	const isClient = typeof window !== 'undefined'

	// Image generation
	if ('prompt' in props && response !== false) {
		const { prompt, size = '256x256', onLoad, onError, ...rest } = props || {}
		const sizes = size.split('x')
		const width = Number.parseInt(sizes[0])
		const height = Number.parseInt(sizes[1])

		return (
			<NextImage
				src={response?.result || ''}
				alt={prompt}
				width={width}
				height={height}
				onLoad={isClient ? imageEvent?.(onLoad, response, prompt) : undefined}
				onError={isClient ? imageEvent?.(onError, response, prompt) : undefined}
				{...rest}
			/>
		)
	}

	// Image description
	if ('src' in props && !('alt' in props) && response !== false) {
		const { src, onLoad, onError, ...rest } = props || {}

		return (
			<NextImage
				src={src}
				alt={response?.result}
				onLoad={isClient ? imageEvent?.(onLoad, response, src) : undefined}
				onError={isClient ? imageEvent?.(onError, response, src) : undefined}
				{...rest}
			/>
		)
	}

	// Regular Next image
	return <NextImage src="" alt="" {...props} />
}

export default Image
