import type { ImageProps } from 'next/image'
import type { HTMLAttributes, ElementType, ReactNode } from 'react'

export interface CardProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
	image?: ImageProps
	title?: ReactNode
	children?: ReactNode
	header?: ReactNode
	footer?: ReactNode
	isFullWidth?: boolean
	variant?: 'default' | 'primary'
	component?: ElementType
}

export default CardProps
