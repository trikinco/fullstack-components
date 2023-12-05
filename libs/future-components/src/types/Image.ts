import OpenAI from 'openai'
import { type ImageProps as NextImageProps } from 'next/image'
import type { SyntheticEvent } from 'react'
import type { ImageResponse } from '../handlers/image/models'

export type ImageGenerationOptions = Partial<
	Omit<OpenAI.ImageGenerateParams, 'n'>
>

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
	response?: ImageResponse<1>,
	/** Image description src */
	src?: string
) => void

export interface ImageGenerateProps
	extends Omit<
			NextImageProps,
			'src' | 'width' | 'height' | 'alt' | 'onLoad' | 'onError' | 'quality'
		>,
		Omit<ImageGenerationOptions, 'quality' | 'style'> {
	/**
	 * Whether or not to render the result string adjacent to the image
	 */
	showResult?: boolean
	/** Alternative text describing the image, uses `prompt` if not provided */
	alt?: string
	/**
	 * The quality of the image that will be generated. `hd` creates images with finer
	 * details and greater consistency across the image. This param is only supported
	 * for `dall-e-3`.
	 */
	imageQuality?: 'standard' | 'hd'
	/**
	 * The style of the generated images. Must be one of `vivid` or `natural`. Vivid
	 * causes the model to lean towards generating hyper-real and dramatic images.
	 * Natural causes the model to produce more natural, less hyper-real looking
	 * images. This param is only supported for `dall-e-3`.
	 */
	imageStyle?: 'vivid' | 'natural' | null
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
	response?: ImageResponse<1>,
	/** Image generation prompt */
	prompt?: string
) => void

export type ImageProps =
	| ImageGenerateProps
	| ImageDescribeProps
	| NextImageProps
