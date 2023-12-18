import { type HTMLAttributes, type ReactNode, type ElementType } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'
import { IconMenuAlt } from './Icons/IconMenuAlt'
import { type ExtractedTypeInfo } from '../utils/getTypeDocs'

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
				<TitleComponent className="flex gap-2 m-0">
					{name && <span className="font-bold">{name}</span>}
					{type && (
						<span className="text-sm font-mono my-auto text-slate-500">
							{type}
						</span>
					)}
					{required && (
						<span className="text-sm font-mono my-auto text-red-600">
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

			{tags && tags.length > 0 && (
				<ul className="not-prose">
					{tags.map(({ name, value }) => (
						<li key={name}>
							<span className="font-bold text-[--shiki-token-keyword] mr-2">
								{name}
							</span>
							{value}
						</li>
					))}
				</ul>
			)}

			{parameters && parameters.length > 0 && (
				<details>
					<summary className="[&::marker]:content-none flex gap-2 mt-3 cursor-pointer text-sm text-slate-500 hover:text-black dark:hover:text-slate-600">
						<IconMenuAlt width={20} height={20} /> Parameters
					</summary>

					<div className="mt-3 border rounded-md border-slate-200 dark:border-slate-800">
						{parameters.map((param, i) => (
							<TypeInfo
								key={i}
								className="p-6 first-of-type:border-t-0"
								{...param}
							/>
						))}
					</div>
				</details>
			)}
			{children}
		</div>
	)
}
