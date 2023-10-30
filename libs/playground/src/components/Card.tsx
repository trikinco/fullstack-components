import type {
	HTMLAttributes,
	ElementType,
	ReactNode,
	ImgHTMLAttributes,
} from 'react'
import Image from 'next/image'
import { merge } from '../utils/styles'
import type { AsComponent } from '../types/AsComponent'

export interface CardProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
	image?: ImgHTMLAttributes<HTMLImageElement>
	title?: ReactNode
	children?: ReactNode
	footer?: ReactNode
	component?: ElementType
}
export const defaultElement = 'div'

export const Card = <C extends ElementType = typeof defaultElement>({
	as,
	className,
	image,
	title,
	children,
	footer,
	component: TitleComponent = 'p',
	...rest
}: AsComponent<C, CardProps>) => {
	const Component = as || defaultElement
	const {
		src,
		className: imgClassName,
		alt,
		width = 300,
		height = 300,
	} = image || {}

	return (
		<Component
			className={merge(
				'w-full flex flex-col grow max-w-sm p-4 bg-white border-2 border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50',
				className
			)}
			{...rest}
		>
			<div className="flex grow flex-col relative">
				{src && (
					<Image
						className={merge('hover:mix-blend-hard-light', imgClassName)}
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
		</Component>
	)
}
