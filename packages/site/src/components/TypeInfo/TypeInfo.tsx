import type { HTMLAttributes, ReactNode, ElementType } from 'react'
import type { ExtractedTypeInfo } from '@/src/utils/getTypeDocs'
import { merge } from '@trikinco/fullstack-components/utils'
import { TypeInfoTags } from './TypeInfoTags'
import { IconMenuAlt } from '@/src/components/Icons/IconMenuAlt'
import { Accordion } from '@/src/components/Accordion'
import { TypeInfoTitle } from '@/src/components/TypeInfo/TypeInfoTitle'

export interface TypeInfoDetails
	extends Omit<
		ExtractedTypeInfo,
		'name' | 'description' | 'parameters' | 'returns'
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
	 * Return types
	 */
	returns?: TypeInfoDetails | string
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
	properties,
	returns,
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
				<TypeInfoTitle
					id={id}
					name={name}
					type={type}
					required={required}
					component={TitleComponent}
				/>
			)}

			{children}

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
			{returns &&
				typeof returns !== 'string' &&
				returns.properties &&
				returns.properties.length > 0 && (
					<Accordion
						label={
							<>
								<IconMenuAlt width={20} height={20} /> Returns
							</>
						}
					>
						{returns.properties.map((param, i) => (
							<TypeInfo
								key={i}
								className="p-6 first-of-type:border-t-0"
								{...param}
							/>
						))}
					</Accordion>
				)}
			{returns && typeof returns === 'string' && (
				<div className="mt-3">
					<span className="font-bold text-[--shiki-token-keyword] mr-2">
						returns
					</span>
					<span className="not-prose whitespace-pre-wrap [font-variant-ligatures:none] [&>*]:m-0">
						{returns}
					</span>
				</div>
			)}
		</div>
	)
}

export default TypeInfo
