import NextImage, { type ImageProps as NextImageProps } from 'next/image'
import type { CreateImageRequestSizeEnum } from 'openai-edge'
import type { SyntheticEvent } from 'react'
import { request } from '@trikinco/fullstack-components/utils'
import { IS_DEV } from '@/src/utils/constants'

export const imageAPIURLs = {
	describe: '/api/image/describe',
	generate: '/api/image/generate',
} as const

export type ImageResponse = {
	result: string
}

export interface ImageDescribeProps
	extends Omit<NextImageProps, 'src' | 'alt' | 'onLoad' | 'onError'> {
	/**
	 * URL to the image to describe. Generates `alt` text.
	 * The `alt` text is then passed to the image and returned in `onLoad`
	 */
	src: string
	/**
	 * Whether or not to render the result string adjacent to the image
	 */
	showResult?: boolean
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
	response?: ImageResponse,
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
	/**
	 * Whether or not to render the result string adjacent to the image
	 */
	showResult?: boolean
	/** Width and height of the image. Default '256x256' */
	size?: CreateImageRequestSizeEnum
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
	response?: ImageResponse,
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
export async function getImage<T>(props: ImageProps<T>) {
	const shouldGenerateImage = 'prompt' in props
	const apiURL = shouldGenerateImage
		? imageAPIURLs.generate
		: imageAPIURLs.describe
	const body = shouldGenerateImage
		? { prompt: props.prompt }
		: { src: props.src }

	if (!('prompt' in props) && 'alt' in props) {
		if (IS_DEV) {
			console.warn(
				`Provided 'alt' and no 'prompt' for image with src: "${props.src}"\nYou may want to use '<Image>' from 'next/image' instead.`
			)
		}

		return false
	}

	return await request<ImageResponse>(apiURL, { body })
}

/**
 * client-only callback for Image `onLoad` | `onError`
 */
function imageCb<T extends ImageDescribeCallback | ImageGenerateCallback>(
	fn?: T,
	response?: Parameters<T>[1],
	meta?: Parameters<T>[2]
) {
	return (e: SyntheticEvent<HTMLImageElement, Event> | undefined) =>
		fn?.(e, response, meta)
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
		const {
			prompt,
			size = '256x256',
			showResult,
			onLoad,
			onError,
			...rest
		} = props || {}
		const sizes = size.split('x')
		const width = parseInt(sizes[0])
		const height = parseInt(sizes[1])

		return (
			<>
				<NextImage
					src={response?.result || ''}
					alt={prompt}
					width={width}
					height={height}
					onLoad={isClient ? imageCb?.(onLoad, response, prompt) : undefined}
					onError={isClient ? imageCb?.(onError, response, prompt) : undefined}
					{...rest}
				/>
				{showResult && response?.result}
			</>
		)
	}

	// Image description
	if ('src' in props && !('alt' in props) && response !== false) {
		const { src, showResult, onLoad, onError, ...rest } = props || {}

		return (
			<>
				<NextImage
					src={src}
					alt={response?.result}
					onLoad={isClient ? imageCb?.(onLoad, response, src) : undefined}
					onError={isClient ? imageCb?.(onError, response, src) : undefined}
					{...rest}
				/>
				{showResult && response?.result}
			</>
		)
	}

	// Regular Next image
	return <NextImage src="" alt="" {...props} />
}
