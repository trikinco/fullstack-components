import type { HTMLAttributes, ReactNode } from 'react'
import Link, { type LinkProps } from 'next/link'
import Image, { type ImageProps } from 'next/image'
import { merge } from '../../../fullstack-components/dist/utils'

export interface AvatarProps
	extends HTMLAttributes<HTMLAnchorElement>,
		LinkProps {
	children?: ReactNode
	image: ImageProps
}

/**
 * Avatars are small user images wrapped in a link
 */
export const Avatar = ({
	href,
	children,
	className,
	image,
	...rest
}: AvatarProps) => {
	const {
		className: imageClassName,
		alt = '',
		width = 40,
		height = 40,
		...restImage
	} = image
	return (
		<Link
			href={href}
			className={merge(
				'w-8 h-8 md:w-10 md:h-10 rounded-full focus-ring',
				className
			)}
			{...rest}
		>
			<Image
				className={merge(
					'rounded-full border-2 border-slate-300 bg-slate-300 dark:bg-slate-600 dark:border-slate-600',
					imageClassName
				)}
				alt={alt}
				width={width}
				height={height}
				{...restImage}
			/>
		</Link>
	)
}
