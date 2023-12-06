import type { ImageProps } from 'next/image'
import type {
	HTMLAttributes,
	ElementType,
	ReactNode,
	ImgHTMLAttributes,
} from 'react'

export interface CardProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
	image?: ImageProps
	title?: ReactNode
	children?: ReactNode
	header?: ReactNode
	footer?: ReactNode
	component?: ElementType
}

export default CardProps
