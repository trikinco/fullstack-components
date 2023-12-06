import type { ElementType } from 'react'
import Image from 'next/image'
import { merge } from '../../../fullstack-components/dist/utils'
import type { AsComponent } from '../../../fullstack-components/dist'
import type { CardProps } from '@/src/types/Card'

export const defaultElement = 'div'

export const Card = <C extends ElementType = typeof defaultElement>({
	as,
	className,
	image,
	title,
	children,
	header,
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
		...imageRest
	} = image || {}

	return (
		<Component
			className={merge(
				'relative w-full flex flex-col grow sm:max-w-lg p-4 bg-white border-2 border-gray-200 rounded-lg shadow sm:p-8 dark:bg-slate-900 dark:border-slate-800 focus-ring',
				className
			)}
			{...rest}
		>
			{header && (
				<div className="flex gap-2 mt-auto pt-2 absolute top-4 left-4 sm:top-8 sm:left-8 z-10">
					{header}
				</div>
			)}

			<div className="flex flex-wrap gap-3 items-center grow sm:flex-nowrap sm:flex-col relative">
				{src && (
					<Image
						className={merge(
							'w-28 h-28 sm:mx-auto sm:w-auto sm:h-auto invert dark:invert-0 hover:mix-blend-hard-light',
							imgClassName
						)}
						src={src}
						alt={alt || ''}
						width={width}
						height={height}
						{...imageRest}
					/>
				)}

				<div className="flex flex-col flex-1">
					<TitleComponent className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{title}
					</TitleComponent>

					<div className="mb-3 font-normal text-gray-700 dark:text-gray-300">
						{children}
					</div>

					{footer && (
						<div className="w-full flex gap-2 mt-auto pt-2">{footer}</div>
					)}
				</div>
			</div>
		</Component>
	)
}
