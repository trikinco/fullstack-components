import type { ElementType } from 'react'
import Image from 'next/image'
import { merge } from '@trikinco/fullstack-components/utils'
import type { AsComponent } from '@trikinco/fullstack-components'
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
	isFullWidth,
	variant = 'default',
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
				'relative w-full flex flex-col grow sm:max-w-lg p-4 sm:p-8 border rounded-lg',
				variant === 'default' &&
					'bg-white border-gray-200 dark:bg-slate-900 dark:border-slate-800',
				variant === 'primary' &&
					'bg-blue-500 dark:bg-blue-700 border-black/10 dark:border-white/10',
				'focus-ring',
				className
			)}
			{...rest}
		>
			{header && (
				<div className="flex gap-2 mt-auto pt-2 absolute top-4 left-4 sm:top-8 sm:left-8 z-10">
					{header}
				</div>
			)}

			<div
				className={merge(
					'relative',
					'flex flex-wrap gap-3 grow',
					!isFullWidth && 'sm:flex-col sm:flex-nowrap items-center'
				)}
			>
				{src && (
					<Image
						className={merge(
							'w-28 h-28',
							'invert dark:invert-0 hover:mix-blend-hard-light z-10',
							!isFullWidth && 'sm:mx-auto sm:w-auto sm:h-auto',
							imgClassName
						)}
						src={src}
						alt={alt || ''}
						width={width}
						height={height}
						{...imageRest}
					/>
				)}

				<div className="flex flex-col flex-1 my-auto z-10">
					<TitleComponent
						className={merge(
							'mb-2 text-2xl font-bold tracking-tight',
							variant === 'default'
								? 'text-gray-900 dark:text-white'
								: 'text-white'
						)}
					>
						{title}
					</TitleComponent>

					<div
						className={merge(
							'font-normal',
							variant === 'default'
								? 'text-gray-700 dark:text-gray-300'
								: 'text-white',
							!!footer && 'mb-3'
						)}
					>
						{children}
					</div>
				</div>

				{footer && (
					<div className="w-full flex flex-wrap gap-2 mt-auto pt-2 z-10">
						{footer}
					</div>
				)}
			</div>
			<div className="bg-noise pointer-events-none absolute inset-0" />
		</Component>
	)
}

export default Card
