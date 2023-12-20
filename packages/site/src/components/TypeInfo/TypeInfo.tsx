import type { HTMLAttributes, ReactNode, ElementType } from 'react'
import type { ExtractedTypeInfo } from '../../utils/getTypeDocs'
import { merge } from '@trikinco/fullstack-components/utils'
import { TypeInfoTags } from './TypeInfoTags'
import { IconMenuAlt } from '../Icons/IconMenuAlt'
import { Accordion } from '../Accordion'

export interface TypeInfoDetails
	extends Omit<
		ExtractedTypeInfo,
		'name' | 'description' | 'parameters' | 'properties'
	> {
	/**
	 * Name of the type or interface to extract.
	 * Needed to extract a single type from a .ts/x file
	 * @example
	 * 'ButtonProps'
	 */
	name: ReactNode
	/**
	 * Hides the `name`, `type` and `required` in the title
	 */
	hideName?: boolean
	/**
	 * Description to override the top level type description
	 */
	description?: ReactNode
}

export interface TypeInfoProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
		TypeInfoDetails {
	/**
	 * Children to show after the description
	 */
	children?: ReactNode
	/**
	 * Parameters of complex types
	 */
	parameters?: TypeInfoDetails[]
	/**
	 * The title component type
	 * @default 'p''
	 */
	component?: ElementType
}

/**
 * Renders type information extracted from a .d.ts file with `getTypeDocs`
 */
export const TypeInfo = ({
	name,
	type,
	required,
	hideName,
	description,
	parameters,
	children,
	className,
	tags,
	id,
	component: TitleComponent = 'p',
	...rest
}: TypeInfoProps) => {
	return (
		<div
			className={merge(
				'flex flex-col gap-2 py-6 border-t border-slate-200 dark:border-slate-800',
				className
			)}
			{...rest}
		>
			{!hideName && (
				<TitleComponent className="flex gap-2 m-0 scroll-mt-10" id={id}>
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
				</TitleComponent>
			)}

			{description && (
				<span className="not-prose whitespace-pre-wrap [font-variant-ligatures:none] [&>*]:m-0">
					{description}
				</span>
			)}

			<TypeInfoTags tags={tags} />

			{parameters && parameters.length > 0 && (
				<Accordion
					label={
						<>
							<IconMenuAlt width={20} height={20} /> Parameters
						</>
					}
				>
					{parameters.map((param, i) => (
						<TypeInfo
							key={i}
							className="p-6 first-of-type:border-t-0"
							{...param}
						/>
					))}
				</Accordion>
			)}
			{children}
		</div>
	)
}
