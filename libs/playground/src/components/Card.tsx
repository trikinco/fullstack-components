import type { HTMLAttributes, ElementType, ReactNode } from 'react'

export interface CardProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
	title?: ReactNode
	children?: ReactNode
	component?: ElementType
}

export const Card = ({
	title,
	children,
	component: TitleComponent = 'p',
}: CardProps) => {
	return (
		<div className="w-full max-w-sm p-4 bg-white border-2 border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
			<TitleComponent className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{title}
			</TitleComponent>
			<div className="mb-3 font-normal text-gray-700 dark:text-gray-300">
				{children}
			</div>
		</div>
	)
}
