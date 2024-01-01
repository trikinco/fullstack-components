import type { HTMLAttributes, ReactNode } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'
import { TypeInfo, type TypeInfoDetails } from './TypeInfo'
import { getTypeDocs } from '../../utils/getTypeDocs'
import { IconMenuAlt } from '../Icons/IconMenuAlt'
import { Accordion } from '../Accordion'

export interface TypeInfoToTextProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
		Omit<TypeInfoDetails, 'name'> {
	children?: ReactNode
	/**
	 * Name of the type or interface to extract.
	 * Needed to extract a single type from a .ts/x file
	 * @example
	 * 'ButtonProps'
	 */
	name: string
	/**
	 * Title that overrides `name`
	 */
	title?: ReactNode
	/**
	 * Relative path to the fileName to extract types from
	 * @example
	 * 'src/components/Button.tsx'
	 */
	path: string
	/**
	 * Relative path to the base directory to extract types from
	 */
	basePath: string
}

/**
 * Extracts type information from a .d.ts file with `getTypeDocs` and renders it
 */
export const TypeInfoToText = async ({
	basePath = '../fullstack-components/dist/',
	path: filePath,
	name,
	title,
	type,
	description,
	hideName,
	children,
	className,
	...rest
}: TypeInfoToTextProps) => {
	const path = basePath + filePath
	const { properties, parameters, returns, ...schema } = await getTypeDocs(
		path,
		name
	)
	const hasParameters = parameters && parameters?.length > 0

	return (
		<div
			className={merge('typeinfo inline-flex flex-col w-full mb-8', className)}
			{...rest}
		>
			<TypeInfo
				hideName={hideName}
				name={title || schema.name || name}
				type={schema.type}
				description={description || schema.description}
				tags={schema.tags}
				parameters={parameters}
				returns={returns}
				className="border-t-0"
				component="h4"
				id={name}
			>
				{children}
			</TypeInfo>

			{!hasParameters && properties && properties.length > 0 && (
				<Accordion
					label={
						<>
							<IconMenuAlt width={20} height={20} /> Properties
						</>
					}
				>
					{properties.map(
						({ name, type, required, description, parameters, tags }) => (
							<TypeInfo
								key={name}
								name={name}
								type={type}
								required={required}
								description={description}
								parameters={parameters}
								tags={tags}
								className="p-6 first-of-type:border-t-0"
							/>
						)
					)}
				</Accordion>
			)}
		</div>
	)
}
