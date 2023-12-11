import type { HTMLAttributes, ReactNode } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'
import { getTypeDocs } from '@/src/utils/getTypeDocs'
import { TypeInfo } from './TypeInfo'

export interface TypesToMdxProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
	children?: ReactNode
	/**
	 * Relative path to the fileName to extract types from
	 * @example
	 * 'src/components/Button.tsx'
	 */
	path: string
	/**
	 * Name of the type or interface to extract.
	 * Needed to extract a single type from a .ts/x file
	 * @example
	 * 'ButtonProps'
	 */
	name: string
	/**
	 * Title to override the top level type `name`
	 */
	title?: ReactNode
	/**
	 * Hides the top level type `name` or `title`
	 */
	hideTitle?: boolean
	/**
	 * Description to override the top level type description
	 */
	description?: ReactNode
}

export const TypesToMdx = async ({
	path,
	name,
	title,
	hideTitle,
	description,
	children,
	className,
	...rest
}: TypesToMdxProps) => {
	const markdown = await getTypeDocs(path, name)

	return (
		<div
			className={merge('typedoc inline-flex flex-col w-full mb-8', className)}
			{...rest}
		>
			{!hideTitle && (
				<span
					className="text-xl font-bold mb-3 [&>*]:m-0"
					dangerouslySetInnerHTML={{ __html: title || markdown.name }}
				/>
			)}
			{(description || markdown.description) && (
				<span
					className="text-lg mt-0 mb-3 whitespace-pre-wrap [&>*]:m-0"
					dangerouslySetInnerHTML={{
						__html: description || markdown.description || '',
					}}
				/>
			)}

			{markdown.properties.length > 0 && (
				<div className="flex flex-col mt-6">
					{markdown.properties.map(
						({ name, type, required, description, parameters }) => (
							<TypeInfo
								key={name}
								name={name}
								type={type}
								required={required}
								description={description}
								parameters={parameters}
							/>
						)
					)}
				</div>
			)}
		</div>
	)
}
