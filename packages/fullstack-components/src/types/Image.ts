import type OpenAI from 'openai'
import type { ImageProps as NextImageProps } from 'next/image'
import type { SyntheticEvent } from 'react'
import type { ImageResponse } from '../handlers/image/models'

type NextImageDescribeProps = Omit<
	NextImageProps,
	'src' | 'alt' | 'onLoad' | 'onError'
>

/**
 * Props specific to describing an image. Used in `ImageProps`.
 * @extends Omit<NextImageProps, 'src' | 'alt' | 'onLoad' | 'onError'>
 * @link https://nextjs.org/docs/app/api-reference/components/image `next/image` for full `NextImageProps` type information.
 */
export interface ImageDescribeProps extends NextImageDescribeProps {
	/**
	 * URL to the image to describe. Generates `alt` text.
	 * The `alt` text is then passed to the image and returned in `onLoad`.
	 */
	src: string
	/**
	 * Shows the image description text adjacent to the image.
	 */
	showResult?: boolean
	/**
	 * Callback function invoked once the image is completely loaded and the `placeholder` has been removed.
	 */
	onLoad?: (
		/**
		 * A React `HTMLImageElement` event object with no additional properties.
		 */
		event: SyntheticEvent<HTMLImageElement, Event> | undefined,
		/**
		 * A text description response of the image.
		 */
		response?: ImageResponse<1> | undefined,
		/**
		 * An absolute URL to the image being described.
		 * @example 'https://absolute-cat-url/tabbycat.jpg'
		 */
		src?: string
	) => void
	/**
	 * Callback function that is invoked if the image fails to load.
	 */
	onError?: (
		/**
		 * A React `HTMLImageElement` event object with no additional properties.
		 */
		event: SyntheticEvent<HTMLImageElement, Event> | undefined,
		/**
		 * A text description response of the image.
		 */
		response?: ImageResponse<1> | undefined,
		/**
		 * An absolute URL to the image being described.
		 * @example 'https://absolute-cat-url/tabbycat.jpg'
		 */
		src?: string
	) => void
}

export type ImageDescribeCallback = NonNullable<ImageDescribeProps['onLoad']>

type NextImageGenerateProps = Omit<
	NextImageProps,
	'src' | 'width' | 'height' | 'alt' | 'onLoad' | 'onError' | 'quality'
> &
	Partial<Omit<OpenAI.ImageGenerateParams, 'n' | 'quality' | 'style'>>

/**
 * Props specific to generating an image. Used in `ImageProps`.
 * @extends NextImageProps
 * @link https://nextjs.org/docs/app/api-reference/components/image `next/image` for full `NextImageProps` type information.
 * @extends OpenAI.ImageGenerateParams
 * @link https://www.npmjs.com/package/openai `openai` for full `ImageGenerateParams` type information.
 */
export interface ImageGenerateProps extends NextImageGenerateProps {
	/**
	 * Shows the image generation result base64 string or URL adjacent to the image.
	 */
	showResult?: boolean
	/** Alternative text describing the image, uses `prompt` if not provided. */
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
	 */
	onLoad?: (
		/**
		 * A React `HTMLImageElement` event object with no additional properties.
		 */
		event: SyntheticEvent<HTMLImageElement, Event> | undefined,
		/**
		 * The image generation response as a base64 string or URL.
		 */
		response?: ImageResponse<1> | undefined,
		/**
		 * A text description of the desired image. The maximum length is 1000
		 * characters for `dall-e-2` and 4000 characters for `dall-e-3`.
		 */
		prompt?: string
	) => void
	/**
	 * Callback function that is invoked if the image fails to load.
	 */
	onError?: (
		/**
		 * A React `HTMLImageElement` event object with no additional properties.
		 */
		event: SyntheticEvent<HTMLImageElement, Event> | undefined,
		/**
		 * The image generation response as a base64 string or URL.
		 */
		response?: ImageResponse<1> | undefined,
		/**
		 * A text description of the desired image. The maximum length is 1000
		 * characters for `dall-e-2` and 4000 characters for `dall-e-3`.
		 */
		prompt?: string
	) => void
}

export type ImageGenerateCallback = NonNullable<ImageGenerateProps['onLoad']>

/**
 * Props to pass to the `<Image>` Server Component.
 */
export type ImageProps =
	| ImageGenerateProps
	| ImageDescribeProps
	| NextImageProps
