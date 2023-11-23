import { type ImageProps as NextImageProps } from 'next/image'
import type { SyntheticEvent } from 'react'
import type { ImageResponse } from '../handlers/image/models'

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
	response?: ImageResponse,
	/** Image generation prompt */
	prompt?: string
) => void

export type ImageProps<T> = T extends { prompt: unknown }
	? ImageGenerateProps
	: T extends { alt: unknown }
	? NextImageProps
	: ImageDescribeProps
