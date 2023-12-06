import type { ReactNode, HTMLAttributes } from 'react'
import { merge } from '../../../fullstack-components/dist/utils'

export interface PageHeaderProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
	children?: ReactNode
	title?: ReactNode
	headingProps?: HTMLAttributes<HTMLHeadingElement>
}

export const PageHeader = ({
	title,
	className,
	children,
	headingProps,
	...rest
}: PageHeaderProps) => {
	const { className: headingClassName, ...headingRest } = headingProps || {}
	return (
		<header className={merge('mb-16', className)} {...rest}>
			<h1
				className={merge('text-5xl font-bold mb-3', headingClassName)}
				{...headingRest}
			>
				{title}
			</h1>
			{children}
		</header>
	)
}
