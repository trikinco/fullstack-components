import type { ReactNode, HTMLAttributes, ElementType } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'
import type { AsComponent } from '@trikinco/fullstack-components'
import { ID_MAIN } from '@/src/utils/constants'

export interface MainProps extends HTMLAttributes<HTMLElement> {
	children?: ReactNode
}

export const defaultElement = 'main'

export function Main<C extends ElementType = typeof defaultElement>({
	id = ID_MAIN,
	as,
	className,
	children,
	...rest
}: AsComponent<C, MainProps>) {
	const Component = as || defaultElement

	return (
		<Component
			id={id}
			className={merge(
				'flex flex-col gap-6 items-center justify-between p-6 xl:p-24 min-h-screen scroll-mt-10',
				className
			)}
			{...rest}
		>
			{children}
		</Component>
	)
}

export default Main
