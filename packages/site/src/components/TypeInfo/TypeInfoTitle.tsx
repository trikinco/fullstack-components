import type { HTMLAttributes, ReactNode, ElementType } from 'react'
import type { AsComponent } from '@trikinco/fullstack-components'
import type { ExtractedTypeInfo } from '../../utils/getTypeDocs'
import { merge } from '@trikinco/fullstack-components/utils'

export interface TypeInfoTitleProps
	extends Omit<
			ExtractedTypeInfo,
			'name' | 'description' | 'parameters' | 'properties'
		>,
		HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
	/**
	 * Name of the type or interface to extract.
	 * Needed to extract a single type from a .ts/x file
	 * @example
	 * 'ButtonProps'
	 */
	name: ReactNode
	/**
	 * Id of the title, which is a string of the name
	 */
	id?: string
	/**
	 * The title component type
	 * @default 'p''
	 */
	component?: ElementType
}

export const defaultElement = 'span'

/**
 * Type information title
 */
export const TypeInfoTitle = <C extends ElementType = typeof defaultElement>({
	as,
	id,
	name,
	type,
	required,
	component: TitleComponent = 'p',
	className,
	...rest
}: AsComponent<C, TypeInfoTitleProps>) => {
	const Component = !!id ? 'a' : as || defaultElement

	return (
		<TitleComponent className={merge('m-0 scroll-mt-10')} id={id} {...rest}>
			<Component
				className={merge(
					'inline-flex flex-wrap gap-2 relative',
					!!id && 'heading-link'
				)}
				href={!!id ? `#${id}` : undefined}
			>
				{name && <span className="font-bold">{name}</span>}
				{type && (
					<span className="text-sm font-mono font-normal my-auto text-slate-500 dark:text-slate-400">
						{type}
					</span>
				)}
				{required && (
					<span className="text-sm font-mono font-normal my-auto text-red-600">
						required
					</span>
				)}
			</Component>
		</TitleComponent>
	)
}
