import type {
	HTMLAttributes,
	ElementType,
	ReactNode,
	ImgHTMLAttributes,
} from 'react'
import Image from 'next/image'
import { merge } from '@trikinco/fullstack-components/utils'
import type { AsComponent } from '@trikinco/fullstack-components'

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
	component: TitleComponent = 'h2',
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
				'w-full flex flex-col grow max-w-sm p-4 bg-white border-2 border-gray-200 rounded-lg shadow sm:p-8 dark:bg-slate-900 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50',
				className
			)}
			{...rest}
		>
			<div className="flex grow flex-col relative">
				{src && (
					<Image
						className={merge(
							'invert dark:invert-0 hover:mix-blend-hard-light',
							imgClassName
						)}
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

				{footer && <div className="flex gap-2 mt-auto pt-2">{footer}</div>}
			</div>
		</Component>
	)
}
