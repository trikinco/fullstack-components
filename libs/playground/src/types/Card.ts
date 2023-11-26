import type {
	HTMLAttributes,
	ElementType,
	ReactNode,
	ImgHTMLAttributes,
} from 'react'

export interface CardProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
	image?: ImgHTMLAttributes<HTMLImageElement>
	title?: ReactNode
	children?: ReactNode
	header?: ReactNode
	footer?: ReactNode
	component?: ElementType
}

export default CardProps
