import type {
	HTMLAttributes,
	ElementType,
	ReactNode,
	ImgHTMLAttributes,
} from 'react'
import Image from 'next/image'
import { merge } from '../utils/styles'

export interface CardProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
	image?: ImgHTMLAttributes<HTMLImageElement>
	title?: ReactNode
	children?: ReactNode
	footer?: ReactNode
	component?: ElementType
}

export const Card = ({
	image,
	title,
	children,
	footer,
	component: TitleComponent = 'p',
}: CardProps) => {
	const { src, className, alt, width = 300, height = 300 } = image || {}
	return (
		<div className="w-full flex flex-col grow max-w-sm p-4 bg-white border-2 border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
			<div className="flex grow flex-col relative">
				{src && (
					<Image
						className={merge('hover:mix-blend-hard-light', className)}
						src={src}
						alt={alt || ''}
						width={width as number}
						height={height as number}
					/>
				)}

				<TitleComponent className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{title}
				</TitleComponent>

				<div className="mb-3 font-normal text-gray-700 dark:text-gray-300">
					{children}
				</div>

				{footer && <div className="mt-auto pt-2">{footer}</div>}
			</div>
		</div>
	)
}
